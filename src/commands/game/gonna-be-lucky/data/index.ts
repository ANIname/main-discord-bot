import { SlashCommandBuilder } from 'discord.js'


export const data = new SlashCommandBuilder()
  .setName('gonna-be-lucky')
  .setNameLocalizations({
    'uk': 'мені-пощастить',
    'ru': 'мне-повезёт'
  })
  .setDescription('Generates a random event and gives or takes away points')
  .setDescriptionLocalizations({
    'uk': 'Генерує випадкову подію та дає або забирає очки',
    'ru': 'Генерирует случайное событие и даёт или отнимает очки'
  })