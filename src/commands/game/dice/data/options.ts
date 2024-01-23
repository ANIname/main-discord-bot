import { SlashCommandNumberOption, SlashCommandStringOption } from 'discord.js'

export const maximumOption = new SlashCommandNumberOption()
  .setName('maximum')
  .setNameLocalizations({
    'uk': 'максимальне-число',
    'ru': 'максимальное-число'
  })
  .setDescription('Maximum number')
  .setDescriptionLocalizations({
    'uk': 'Максимальне число',
    'ru': 'Максимальное число'
  })
  .setMaxValue(100)
  .setMinValue(1)

export const minimumOption = new SlashCommandNumberOption()
  .setName('minimum')
  .setNameLocalizations({
    'uk': 'мінімальне-число',
    'ru': 'минимальное-число'
  })
  .setDescription('Minimum number')
  .setDescriptionLocalizations({
    'uk': 'Мінімальне число',
    'ru': 'Минимальное число'
  })
  .setMaxValue(100)
  .setMinValue(1)

export const titleOption = new SlashCommandStringOption()
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