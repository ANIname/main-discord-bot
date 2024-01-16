import { ChatInputCommandInteraction } from 'discord.js'

import { InteractionOptions, Weapon } from './types.d'

/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {InteractionOptions} - Interaction options
 */
export default function prepareInteractionOptions (interaction: ChatInputCommandInteraction): InteractionOptions {
  const weapon = interaction.options.getString('weapon') as Weapon || 'rock'
  const timer  = (interaction.options.getNumber('timer') || 0) * 60 * 1000
  const bet    = interaction.options.getNumber('bet') || 0

  return { weapon, timer, bet }
}