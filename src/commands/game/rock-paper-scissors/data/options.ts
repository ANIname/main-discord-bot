import { SlashCommandNumberOption, SlashCommandStringOption } from 'discord.js'

import weapons from '../weapons.json'

export const weaponOption = new SlashCommandStringOption()
  .setRequired(true)
  .setName('weapon')
  .setNameLocalizations({ 'uk': 'зброя', 'ru': 'оружие' })
  .setDescription('Choose your weapon (rock, paper, scissors)')
  .setDescriptionLocalizations({
    'uk': 'Оберіть зброю (камінь, ножиці, папір)',
    'ru': 'Выберите оружие (камень, ножницы, бумага)'
  })
  .addChoices(...Object.values(weapons))

export const timerOption = new SlashCommandNumberOption()
  .setName('timer')
  .setNameLocalizations({ 'uk': 'таймер', 'ru': 'таймер' })
  .setDescription('Time to join the game (in minutes). Resets on every new player join.')
  .setDescriptionLocalizations({
    'uk': 'Час на приєднання до гри (в хвилинах). Перезапускається при кожному приєднанні нового гравця.',
    'ru': 'Время на присоединение к игре (в минутах). Перезапускается при каждом присоединении нового гравця.'
  })
  .setMaxValue(60)
  .setMinValue(1)

export const betOption = new SlashCommandNumberOption()
  .setName('bet')
  .setNameLocalizations({ 'uk': 'ставка', 'ru': 'ставка' })
  .setDescription('Bet amount')
  .setDescriptionLocalizations({
    'uk': 'Сума ставки',
    'ru': 'Сумма ставки'
  })