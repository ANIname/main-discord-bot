import { ChatInputCommandInteraction, TextChannel } from 'discord.js'

import gameChannels from './channels'
import playGame from './play-game'
import { GameChannelOptions, Player } from './types.d'
import weapons from './weapons.json'

/**
 * Play game with other players
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {Player[]} playersArray - Players array
 * @returns {void} - Promise
 */
export default function playGameWithOtherPlayers(interaction: ChatInputCommandInteraction, playersArray: Player[]): void {
  playGame(playersArray)

  getGameResult(interaction, playersArray)
}

/**
 * Get game result
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {Player[]} playersArray - Players array
 * @returns {void} - Promise
 */
function getGameResult (interaction: ChatInputCommandInteraction, playersArray: Player[]): void {
  if (!(interaction.channel instanceof TextChannel)) {
    interaction.editReply({ content: 'Бот попытался начать игру, но она доступна только в текстовых каналах!' })

    return
  }

  const gameChannelOptions  = gameChannels[interaction.channel.id] as GameChannelOptions
  const messagesToDeleteIds = [...gameChannelOptions.joinedMessagesIds, gameChannelOptions.initiateMessageId]

  interaction.channel.bulkDelete(messagesToDeleteIds)
  
  const isDraw = playersArray[0]?.status === 'draw'

  if (isDraw) {
    const playersChoice  = weapons[(playersArray[0] as Player).choice]

    const message = 'Игра в камень-ножницы-бумага завершена ничьей! Игроки:' +
      '\n' +
      playersArray.map((player) => `🤝 <@${player.id}>`).join('\n') +
      '\n' +
      `Выбор: ${playersChoice}` +
      '\n' +
      'Спасибо за игру! Если хотите сыграть ещё раз, то введите команду `/rock-paper-scissors`!'
    
    interaction.channel.send(message)

    delete gameChannels[interaction.channel.id]
  }

  else {
    const table = playersArray.map((player) => {
      const doesPlayerWin = player.status === 'win'
      const playerChoice  = weapons[player.choice]

      const message = doesPlayerWin
        ? `🎉 <@${player.id}> Выиграл(а)!`
        : `😭 <@${player.id}> Проиграл(а)!`

      return `${message} Выбор: ${playerChoice}`
    }).join('\n')

    const message = 'Игра в камень-ножницы-бумага завершена! Результаты:' +
      '\n' +
      table +
      '\n' +
      'Спасибо за игру! Если хотите сыграть ещё раз, то введите команду `/rock-paper-scissors`!'
    
    interaction.channel.send(message)

    delete gameChannels[interaction.channel.id]
  }
}