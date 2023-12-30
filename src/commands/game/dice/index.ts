import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('dice')
  .setDescription('Подбрасывает кубик (от 1 до 6 по дефолту)')
  .addIntegerOption((option) =>
    option
      .setName('min')
      .setDescription('Минимальное значение')
      .setMinValue(0)
  )
  .addIntegerOption((option) =>
    option
      .setName('max')
      .setDescription('Максимальное значение')
      .setMaxValue(999_999_999_999_999)
  )
  .addStringOption((option) =>
    option
      .setName('title')
      .setDescription('Заголовок')
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