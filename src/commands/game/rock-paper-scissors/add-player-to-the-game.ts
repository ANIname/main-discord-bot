import { ChatInputCommandInteraction, TextChannel } from 'discord.js'

import gameChannels from './channels'
import gamePlayHandlers from './game-play-handlers'
import playGameWithOtherPlayers from './play-game-with-other-players'
import { Player } from './types.d'

/**
 * Add player to the game and start timer
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {Player} player - Current player
 * @returns {void} - Promise
 */
export default function addPlayerToTheGame(interaction: ChatInputCommandInteraction, player: Player): void {
  if (!(interaction.channel instanceof TextChannel)) {
    interaction.editReply({ content: 'Вы пытаетесь добавится в игру, но игра доступна только в текстовых каналах!' })

    return
  }

  const playersLength = gameChannels[interaction.channel.id]?.players.push(player) || 1
  const playersArray  = gameChannels[interaction.channel.id]?.players || []

  delete gamePlayHandlers[playersLength - 1]

  // eslint-disable-next-line security/detect-object-injection
  gamePlayHandlers[playersLength] = playGameWithOtherPlayers

  // eslint-disable-next-line security/detect-object-injection
  setTimeout(() => gamePlayHandlers[playersLength]?.(interaction, playersArray), gameChannels[interaction.channel.id]?.timer)

  interaction.deleteReply()
}