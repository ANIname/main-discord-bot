import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with pong!')

/**
 * Replies with pong!
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 */
export async function execute (interaction: ChatInputCommandInteraction) {
  await interaction.reply({ content: 'Secret Pong!', ephemeral: true })
}