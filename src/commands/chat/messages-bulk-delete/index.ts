import declineWorl from 'decline-word'
import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('messages-bulk-delete')
  .setNameLocalizations({
    'uk': 'масове-видалення-повідомлень',
    'ru': 'массовое-удаление-сообщений'
  })
  .setDescription('Bulk delete messages')
  .setDescriptionLocalizations({
    'uk': 'Видаляє декілька повідомлень в чаті однією командою',
    'ru': 'Удаляет несколько сообщений в чате одной командой'
  })
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .setDMPermission(false)
  .addIntegerOption((option) => 
    option
      .setName('amount')
      .setNameLocalizations({
        'uk': 'кількість-повідомлень',
        'ru': 'количество-сообщений'
      })
      .setDescription('Amount of messages to delete')
      .setDescriptionLocalizations({
        'uk': 'Кількість повідомлень для видалення',
        'ru': 'Количество сообщений для удаления'
      })
      .setRequired(true)
      .setMaxValue(100)
      .setMinValue(2)
  )

/**
 * Bulk delete messages
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 */
export async function execute(interaction: ChatInputCommandInteraction) {
  const amount  = interaction.options.getInteger('amount') as number
  const channel = interaction.channel as TextChannel

  const locales = {
    'uk': `Видалено ${amount} ${declineWorl(amount, 'повідомлен', 'ня', 'ня', 'ь')}`,
    'ru': `Удалено ${amount} ${declineWorl(amount, 'сообщени', 'е', 'я', 'й')}`,
    'en': `Deleted ${amount} messages`
  }

  const message = locales[interaction.locale as 'uk' | 'ru'] || locales['en']

  await interaction.deferReply({ ephemeral: true })
  await channel.bulkDelete(amount)
  await interaction.editReply(message)
}