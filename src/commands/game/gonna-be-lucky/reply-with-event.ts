import { ChatInputCommandInteraction } from 'discord.js'

import { GameEvent } from './types.d'

/**
 * Reply to user
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {GameEvent} event - Game event
 * @returns {Promise<void>} - Promise
 */
export default function replyWithEvent(interaction: ChatInputCommandInteraction, event: GameEvent) {
  const points      = String(event.points)
  const declination = event.declination
  const data        = event.data.replace(points, '').trim()
  const pointsText  = event.points >= 0 ? `+${points}` : points

  return interaction.editReply({ content: `${data} ${pointsText} ${declination}` })
}