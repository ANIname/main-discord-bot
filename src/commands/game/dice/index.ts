import { ChatInputCommandInteraction } from 'discord.js'

export * from './data'

/**
 * Rolls a dice
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<void>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction) {
  const title = interaction.options.getString('title') || '🎲'

  const min = interaction.options.getNumber('minimum') || 1
  const max = interaction.options.getNumber('maximum') || 6
  
  const result = Math.floor(Math.random() * (max - min + 1)) + min

  await interaction.reply(`${title} ${result}`)
}