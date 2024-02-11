import { ChatInputCommandInteraction } from "discord.js"

export const commandName = 'test'

/**
 * This command is only for testing new features
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<void>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply('Test command')
}