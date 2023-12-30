import { ChatInputCommandInteraction } from 'discord.js'

import { ChatInputCommandInteractionOptions, Weapon } from './types.d'

/**
 * Get interaction options
 * @param {ChatInputCommandInteraction} interaction - Interaction
 * @returns {ChatInputCommandInteractionOptions} Interaction options
 */
export default function getInteractionOptions(interaction: ChatInputCommandInteraction): ChatInputCommandInteractionOptions {
  const weapon = interaction.options.getString('weapon') as Weapon
  const bet    = interaction.options.getNumber('bet') || 0
  const timer  = (interaction.options.getNumber('timer') || 0) * 1000 * 60

  return { weapon, bet, timer }
}