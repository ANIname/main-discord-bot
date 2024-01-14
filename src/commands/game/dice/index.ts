import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('dice')
  .setNameLocalizations({
    'uk': 'випадковість',
    'ru': 'случайность'
  })
  .setDescription('Rolls a dice (from 1 to 6 by default)')
  .setDescriptionLocalizations({
    'uk': 'Підкидає кубик (від 1 до 6 за замовчуванням)',
    'ru': 'Подкидывает кубик (от 1 до 6 по умолчанию)'
  })
  .addIntegerOption((option) =>
    option
      .setName('min')
      .setNameLocalizations({
        'uk': 'мінімум',
        'ru': 'минимум'
      })
      .setDescription('Minimum value')
      .setDescriptionLocalizations({
        'uk': 'Мінімальне значення',
        'ru': 'Минимальное значение'
      })
      .setMinValue(0)
  )
  .addIntegerOption((option) =>
    option
      .setName('max')
      .setNameLocalizations({
        'uk': 'максимум',
        'ru': 'максимум'
      })
      .setDescription('Maximum value')
      .setDescriptionLocalizations({
        'uk': 'Максимальне значення',
        'ru': 'Максимальное значение'
      })
      .setMaxValue(999_999_999_999_999)
  )
  .addStringOption((option) =>
    option
      .setName('title')
      .setNameLocalizations({
        'uk': 'заголовок',
        'ru': 'заголовок'
      })
      .setDescription('Title for the message')
      .setDescriptionLocalizations({
        'uk': 'Заголовок для повідомлення',
        'ru': 'Заголовок для сообщения'
      })
  )

/**
 * Rolls a dice
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<void>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction) {
  const title = interaction.options.getString('title') || '🎲'

  const min = interaction.options.getInteger('min') || 1
  const max = interaction.options.getInteger('max') || 6
  
  const result = Math.floor(Math.random() * (max - min + 1)) + min

  await interaction.reply(`${title} ${result}`)
}