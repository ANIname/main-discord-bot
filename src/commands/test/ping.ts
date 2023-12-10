import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Отвечает: "Pong!"')

/**
 * Replies with pong!
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 */
export async function execute (interaction: ChatInputCommandInteraction) {
  await interaction.reply({ content: 'Pong!', ephemeral: true })
}