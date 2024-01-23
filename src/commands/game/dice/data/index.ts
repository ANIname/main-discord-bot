import { SlashCommandBuilder } from 'discord.js'

import { maximumOption, minimumOption, titleOption } from './options'

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
  .addNumberOption(maximumOption)
  .addNumberOption(minimumOption)
  .addStringOption(titleOption)
