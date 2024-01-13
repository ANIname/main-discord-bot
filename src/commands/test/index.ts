import {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('test')
  .setDescription('Команда для тестирования нового функционала')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

/**
 * Bulk delete messages
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 */
export async function execute(interaction: ChatInputCommandInteraction) {
  console.log('test:', interaction.user.id)
}