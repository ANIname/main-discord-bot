import { ContextMenuCommandInteraction, InteractionResponse, Message, TextChannel } from 'discord.js'
import { pascal as pascalCase } from 'case'
import camelCase from 'lodash/camelCase'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import find from 'lodash/find'
import startsWith from 'lodash/startsWith'

import { getUserId } from '../../../../services/knex/base-queries/user'
import { availableGames } from '../../../../services/knex/enum'

import knex from '../../../../services/knex'
import openAi from '../../../../services/open-ai'

import { commandTimeOut } from '../../types.d'

const timeOut = 1000 * 60 // 5 minute

const commandTimeOut: commandTimeOut = {}

export * from './data'

/**
 * Generates a random event and gives or takes away points
 * @param {ContextMenuCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<InteractionResponse<boolean> | Message<boolean>>} - Promise
 */
export async function execute(interaction: ContextMenuCommandInteraction): Promise<InteractionResponse<boolean> | Message<boolean>> {
  // eslint-disable-next-line security/detect-object-injection
  const timeOutEnd = commandTimeOut[interaction.user.id] as Date | undefined
  const needToWait = timeOutEnd && Date.now() - timeOutEnd.getTime() < timeOut

  if (needToWait) {
    const waitTimeInSeconds = Math.floor((timeOut - (Date.now() - timeOutEnd.getTime())) / 1000)

    return interaction.reply({
      content: `Пожалуйста, наберитесь терпения! Подождите еще ${waitTimeInSeconds} сек. И я снова буду готова!`,
      ephemeral: true
    })
  }
  
  try {
    await interaction.deferReply()
  
    const userId = await getUserId(interaction.targetId)
    
    const userGamesQuery = knex('Game')
      .where('Game.userId', userId)
      .select('Game.title', 'Game.createdAt')

    forEach(availableGames, (gameTitle) => {
      const gameName = pascalCase(`Game-${gameTitle}`)

      userGamesQuery
        .leftJoin(gameName, 'Game.id', `${gameName}.gameId`)
        .select(`${gameName}.points`)
        .select(`${gameName}.id as gameId`)
    })

    const userGames = await userGamesQuery

    const totalPoints = reduce(userGames, (accumulator, game) => accumulator + game.points, 0)

    const discordGuildEvents = []

    const promises = map(userGames, async (userGame) => {
      const pascalGameName = pascalCase(`Game-${userGame.title}`)
      const camelGameName = camelCase(`Game-${userGame.title}`)

      const gameEvents = await knex(`${pascalGameName}Event`)
        .where({ [`${camelGameName}Id`]: userGame.gameId })

      if (userGame.title === 'discordGuild') {
        discordGuildEvents.push(...gameEvents)
      }

      return { ...userGame, events: gameEvents }
    })

    const userGamesWithEvents = await Promise.all(promises)
    
    let prompt = `Привет! Мне нужно чтобы ты подготовил отчёт об участнике дискорд сервера <@${interaction.targetId}>. `
    + 'Вот его данные:'
    
    forEach(userGamesWithEvents, (userGame) => {
      if (userGame.title === 'discordGuild') return
      
      prompt += '\n* Очки в игре ' + userGame.title + ': ' + userGame.points
    })
    
    const discordGuildPoints = find(userGamesWithEvents, { title: 'discordGuild' })
    const combinedDiscordGuildEvents = reduce(discordGuildPoints.events, (accumulator, event) => {
      // @ts-expect-error
      if (!accumulator[event.reason]) {
        // @ts-expect-error
        accumulator[event.reason] = { ...event, count: 1 }
      } else {
        // @ts-expect-error
        accumulator[event.reason].points += event.points
        // @ts-expect-error
        accumulator[event.reason].count += 1
      }

      return accumulator
    }, {})

    // @ts-expect-error
    const dalyEvent = combinedDiscordGuildEvents['Ежедневное бонусное очко']
    const joinEvent = find(combinedDiscordGuildEvents, ({ reason }) => startsWith(reason, 'За присоединение к серверу'))

    // @ts-expect-error
    const dalyPoints = joinEvent.points + dalyEvent.points

    prompt += `\nТак-же за активность на сервере, участник получил ${discordGuildPoints.points} очков. Вот события за которые участник получил ${discordGuildPoints.points} очков:`
      + `\n* ${dalyPoints} очков за присоединение к серверу ${dalyPoints} дней назад.`  
    // + '\nпо одному очку за каждый день с момента присоединения к серверу, участник получил ' + dalyPoints + ' очков.'

    forEach(combinedDiscordGuildEvents, (event) => {
      // @ts-expect-error
      if (event.reason === 'Ежедневное бонусное очко') return
      // @ts-expect-error
      if (startsWith(event.reason, 'За присоединение к серверу')) return

      // @ts-expect-error
      prompt += `\n* ${event.reason} - ${event.count} раз. Итого: ${event.points} очков`
    })

    prompt += '\n\nУчти что если ты видишь минус - это означает что число негативное. Тоесть "-5" - это минус 5 очков, а "5" - это плюс 5 очков. '
    prompt += '\nТак-же учти что в моём сообщении может и не быть негативных чисел. '
    prompt += '\nЕсли ты видишь негативное число - не говори что участник получил очки а наоборот.'
    prompt += `\nВсего очков: ${totalPoints}`
    prompt += '\nПомни что сервер не мой'
    prompt += '\n Пользователя всегда указывай в формате <@id>'
    prompt += '\n Мне нужен только отчёт, без всяких дополнительных комментариев.'

    console.log(prompt)

    const result = await openAi.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'system', content: prompt }]
    })

    const textChannel = await interaction.guild?.channels.cache.get('1173982574352269482') as TextChannel

    await textChannel.send({ content: prompt })
    await textChannel.send({ content: result.choices[0]?.message.content as string })

    return interaction.editReply({ content: result.choices[0]?.message.content })
  } catch (error) {
    const textChannel = await interaction.guild?.channels.cache.get('1173982574352269482') as TextChannel

    // @ts-expect-error
    await textChannel.send({ content: `Бот пытался сгенерировать отчёт о пользователе <@${interaction.targetId}>. На столкнулся с ошибкой: ${error.message}` })

    throw error
  }
}