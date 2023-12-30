import {ChatInputCommandInteraction} from 'discord.js'

import gameChannels from './channels'
import {Player} from './types.d'
import weapons from './weapons.json'

/**
 * Reply and say that player already in game
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {Player} player - Existing player
 * @returns {void} - Promise
 */
export default function replyToExistingPlayer(interaction: ChatInputCommandInteraction, player: Player): void {
  const playerChoice = weapons[player.choice]

  console.log(gameChannels)

  interaction.editReply({ content: `Вы уже в игре! Ваш выбор: ${playerChoice}` })
}