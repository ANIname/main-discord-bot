import {
  ChatInputCommandInteraction,
  NewsChannel,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel
} from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('messages-bulk-delete')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .setDescription('Удаляет несколько сообщений в чате одной командой')
  .addIntegerOption((option) => 
    option
      .setName('amount')
      .setRequired(true)
      .setDescription('Количество сообщений для удаления')
      .setMaxValue(100)
      .setMinValue(2)
  )

/**
 * Bulk delete messages
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 */
export async function execute(interaction: ChatInputCommandInteraction) {
  const amount = interaction.options.getInteger('amount') as number

  await interaction.deferReply({ ephemeral: true })

  if (interaction.channel instanceof TextChannel || interaction.channel instanceof NewsChannel) {
    await interaction.channel.bulkDelete(amount)
    await interaction.editReply(`Deleted ${amount} messages`)
  } else {
    await interaction.editReply('This command can only be used in text channels')
  }
}