import { SlashCommandBuilder } from '@discordjs/builders'

import { betOption, timerOption, weaponOption } from './options'

export const data = new SlashCommandBuilder()
  .setName('rock-paper-scissors')
  .setNameLocalizations({
    'uk': 'камінь-ножиці-папір',
    'ru': 'камень-ножницы-бумага'
  })
  .setDescription('Rock Paper Scissors game')
  .setDescriptionLocalizations({
    'uk': 'Гра в камінь ножиці папір',
    'ru': 'Игра в камень ножницы бумага'
  })
  .addStringOption(weaponOption)
  .addNumberOption(betOption)
  .addNumberOption(timerOption)