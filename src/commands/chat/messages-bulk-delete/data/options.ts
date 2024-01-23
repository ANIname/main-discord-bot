import { SlashCommandNumberOption } from 'discord.js'

export const amountOption = new SlashCommandNumberOption()
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