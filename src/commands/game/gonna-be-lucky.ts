import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import includes from 'lodash/includes'

import * as mongodb from '../../../services/mongidb'
import openAi from '../../../services/open-ai'

interface User {
  _id?: string
  discord?: {
    id: string
  }
  games?: {
    gonnaBeLucky?: {
      points: number
      events: GameEvent[]
    }
  }
}

interface GameEvent {
  event: string
  points: number
  increase: boolean
  declination: string
  date?: Date
}

interface GameTimeOut {
  [key: string]: Date
}

const timeOut = 1000 * 60 * 60 // 1 hour

const gameTimeOut: GameTimeOut = {}

export const data = new SlashCommandBuilder()
  .setName('gonna-be-lucky')
  .setDescription('Генерирует случайное событие и даёт или отнимает очки')

const promt = (mention: string) =>
  'Мы играем в игру:"gonna be lucky".' +
  '\n Суть игры проста. Ты генерируешь случайное событие (забавное, смешное, или обычное) и даёшь или отнимаешь очки.' +
  `\n Например: "${mention} решил прогуляться и потерял кошелёк. -10 очков.".` +
  `\n Или: "${mention} пошел в казино и выбил джекпот. +100 очков."` +
  `\n Или: "${mention} не смог найти работу. -50 очков."` +
  '\n Я буду считать очки и вести таблицу лидеров.' +
  '\n От тебя я хочу только сгенерированное событие и количество очков. Не больше, не меньше.' +
  '\n Формат json объект. Где event - это событие, points - это очки, increase - тут ты указываешь булеаном добавляешь очки, или отнимаешь, declination - указываешь склонение (очко, очка, очков)' +
  '\n Важно чтобы формат был именно такой, иначе я не смогу правильно посчитать очки.' +
  `\n Пример: {"event": "${mention} пошел в казино и выбил джекпот.", "points": 100, "increase": true, "declination": "очков"}` +
  '\n Буду рад если ты будешь генерировать забавные события, суть в том чтобы было весело, а так-же не будешь повторяться.' +
  '\n Не нужно оборачивать сообщение дополнительно в кавычки. Тоесть вместо \'"текст"\' пиши просто \'текст\'.' +
  '\n Мне нужно только одно событие' +
  `\n Где: ${mention} - никнейм игрока.`

/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 */
export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply()
  
  const time = gameTimeOut[interaction.user.id]

  if (time && Date.now() - time.getTime() < timeOut) {
    await interaction.reply({
      content: `Пожалуйста, наберитесь терпения! Подождите еще ${Math.floor((timeOut - (Date.now() - time.getTime())) / 1000 / 60)} мин. И я снова буду готова!`,
      ephemeral: true
    })
    return
  }

  const result = await openAi.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: promt(`<@${interaction.user.id}>`) },
    ]
  })

  const { event, points, increase, declination } = JSON.parse(result.choices[0]?.message.content || '{}') as GameEvent

  const stringPoints = `${increase ? '+' : '-'}${points} ${declination}`

  const message = includes(event, stringPoints) ? event : `${event} ${stringPoints}`

  await interaction.editReply({ content: message })

  const user = (await mongodb.user.findOne({ discord: { id: interaction.user.id } })) || {}

  const dataToUpsert = {
    discord: {
      id: interaction.user.id
    },

    'games.gonnaBeLucky': {
      points: getPoints(user, points, increase),
      events: getEvents(user, event, points, increase, declination)
    }
  }

  await mongodb.user.findOneAndUpdate(
    { discord: { id: interaction.user.id } },
    { $set: dataToUpsert },
    { upsert: true }
  )

  gameTimeOut[interaction.user.id] = new Date()
}

/**
 * @param {User} user - User
 * @param {number} pointsToSet - Points to set
 * @param {boolean} increase - Increase or decrease points
 * @returns {number} - Points
 */
function getPoints(user: User, pointsToSet: number, increase: boolean): number {
  const points = (user?.games?.gonnaBeLucky?.points || 0) as number

  return increase ? points + pointsToSet : points - pointsToSet
}

/**
 * @param {User} user - User
 * @param {string} event - Event
 * @param {number} points - Points
 * @param {boolean} increase - Increase or decrease points
 * @param {string} declination - Declination
 * @returns {GameEvent[]} - Events
 */
function getEvents(user: User, event: string, points: number, increase: boolean, declination: string): GameEvent[] {
  const events = (user?.games?.gonnaBeLucky?.events || []) as GameEvent[]

  return [...events, {
    event,
    points,
    increase,
    declination,
    date: new Date()
  }]
}