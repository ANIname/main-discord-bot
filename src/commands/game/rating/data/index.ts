import { SlashCommandBuilder } from 'discord.js'

import { limitOption } from './options'

export const data = new SlashCommandBuilder()
  .setName('rating')
  .setNameLocalizations({ 'uk': 'рейтинг', 'ru': 'рейтинг' })
  .setDescription('Shows guild members rating')
  .setDescriptionLocalizations({
    'uk': 'Показує рейтинг учасників гільдії',
    'ru': 'Показывает рейтинг участников гильдии'
  })
  .addNumberOption(limitOption)
