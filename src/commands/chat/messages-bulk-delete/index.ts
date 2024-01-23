import declineWord from 'decline-word'
import { ChatInputCommandInteraction, TextChannel } from 'discord.js'

export * from './data'

/**
 * Bulk delete messages
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 */
export async function execute(interaction: ChatInputCommandInteraction) {
  const amount  = interaction.options.getNumber('amount') as number
  const channel = interaction.channel as TextChannel

  const locales = {
    'uk': `Видалено ${amount} ${declineWord(amount, 'повідомлен', 'ня', 'ня', 'ь')}`,
    'ru': `Удалено ${amount} ${declineWord(amount, 'сообщени', 'е', 'я', 'й')}`,
    'en': `Deleted ${amount} messages`
  }

  const message = locales[interaction.locale as 'uk' | 'ru'] || locales['en']

  await interaction.deferReply({ ephemeral: true })
  await channel.bulkDelete(amount)
  await interaction.editReply(message)
}