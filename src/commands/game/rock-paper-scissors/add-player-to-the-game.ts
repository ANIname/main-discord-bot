import { ChatInputCommandInteraction, TextChannel } from 'discord.js'

import gameChannels from './channels'
import gamePlayHandlers from './game-play-handlers'
import playGameWithOtherPlayers from './play-game-with-other-players'
import { GameChannelOptions, Player } from './types.d'

/**
 * Add player to the game and start timer
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {Player} player - Current player
 * @returns {Promise<void>}
 */
export default async function addPlayerToTheGame(interaction: ChatInputCommandInteraction, player: Player): Promise<void> {
  if (!(interaction.channel instanceof TextChannel)) {
    interaction.editReply({ content: 'Вы пытаетесь добавится в игру, но игра доступна только в текстовых каналах!' })

    return
  }

  const gameChannelOptions = gameChannels[interaction.channel.id] as GameChannelOptions
  const playersLength      = gameChannelOptions.players.push(player) || 1
  const playersArray       = gameChannelOptions.players || []

  const message = `Игрок <@${player.id}> присоединился к игре камень-ножницы-бумага! ` +
    'Использовав команду: `/rock-paper-scissors`' +
    '\n' +
    `Таймер на присоединение перезапущен! Игра начнётся через ${gameChannelOptions.timer / 1000 / 60} мин!`

  const sentMessage = await interaction.channel.send(message)

  gameChannelOptions.joinedMessagesIds.push(sentMessage.id)

  delete gamePlayHandlers[playersLength - 1]

  // eslint-disable-next-line security/detect-object-injection
  gamePlayHandlers[playersLength] = playGameWithOtherPlayers

  // eslint-disable-next-line security/detect-object-injection
  setTimeout(() => gamePlayHandlers[playersLength]?.(interaction, playersArray), gameChannelOptions.timer)

  interaction.deleteReply()
}