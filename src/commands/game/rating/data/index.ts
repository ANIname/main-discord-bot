import { SlashCommandBuilder } from 'discord.js'

import { limitOption } from './options'

export const data = new SlashCommandBuilder()
  .setName('rating')
  .setNameLocalizations({ 'uk': 'рейтинг', 'ru': 'рейтинг' })
  .setDescription('Shows server members rating')
  .setDescriptionLocalizations({
    'uk': 'Показує рейтинг учасників серверу',
    'ru': 'Показывает рейтинг участников сервера'
  })
  .addNumberOption(limitOption)
