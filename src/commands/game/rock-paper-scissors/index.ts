import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandNumberOption, SlashCommandStringOption } from 'discord.js'

import initiateGameWithPlayers from './initiate-game-with-players'
import playGameWithBot from './play-game-with-bot'
import prepareInteractionOptions from './prepare-interaction-options'
import weapons from './weapons.json'

const weaponOption = (option: SlashCommandStringOption) => option
  .setRequired(true)
  .setName('weapon')
  .setNameLocalizations({ 'uk': 'зброя', 'ru': 'оружие' })
  .setDescription('Choose your weapon (rock, paper, scissors)')
  .setDescriptionLocalizations({
    'uk': 'Оберіть зброю (камінь, ножиці, папір)',
    'ru': 'Выберите оружие (камень, ножницы, бумага)'
  })
  .addChoices(...Object.values(weapons))

const timerOption = (option: SlashCommandNumberOption) => option
  .setAutocomplete(true)
  .setName('timer')
  .setNameLocalizations({ 'uk': 'таймер', 'ru': 'таймер' })
  .setDescription('Time to join the game (in minutes). Resets on every new player join.')
  .setDescriptionLocalizations({
    'uk': 'Час на приєднання до гри (в хвилинах). Перезапускається при кожному приєднанні нового гравця.',
    'ru': 'Время на присоединение к игре (в минутах). Перезапускается при каждом присоединении нового гравця.'
  })
  .setMaxValue(60)
  .setMinValue(1)

const betOption = (option: SlashCommandNumberOption) => option
  .setName('bet')
  .setNameLocalizations({ 'uk': 'ставка', 'ru': 'ставка' })
  .setDescription('Bet amount')
  .setDescriptionLocalizations({
    'uk': 'Сума ставки',
    'ru': 'Сумма ставки'
  })

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
  .addNumberOption(timerOption)
  .addNumberOption(betOption)

/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<Message<boolean>>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction): Promise<Message<boolean>> {
  await interaction.deferReply({ ephemeral: true })

  const interactionOptions = prepareInteractionOptions(interaction)

  return (interaction.channel)
    ? initiateGameWithPlayers(interaction, interactionOptions)
    : playGameWithBot(interaction, interactionOptions)
}