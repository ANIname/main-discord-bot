import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import addPlayerToTheGame from './add-player-to-the-game'
import gameChannels from './channels'
import getInteractionOptions from './get-interaction-options'
import { getUserPlayer } from './get-player'
import initiateGame from './initiate-game'
import playGameWithBot from './play-game-with-bot'
import replyToExistingPlayer from './reply-to-existing-player'
import { GameChannelOptions } from './types.d'

export const data = new SlashCommandBuilder()
  .setName('test-rock-paper-scissors')
  .setDescription('Игра в камень-ножницы-бумага')
  .addStringOption((option) =>
    option
      .setName('weapon')
			.setDescription('Выберите оружие')
      .setRequired(true)
      .addChoices(
        {
          name: 'камень',
          value: 'rock'
        },
        {
          name: 'ножницы',
          value: 'scissors'
        },
        {
          name: 'бумага',
          value: 'paper'
        }
      )
  )
  .addNumberOption((option) =>
    option
      .setName('bet')
      .setDescription('Количество очков, которые вы хотите поставить')
      .setMinValue(0)
  )
  .addNumberOption((option) =>
    option
      .setName('timer')
      .setDescription('Время в минутах, которое будет отведено на присоединение соперника')
      .setMinValue(1)
      .setMaxValue(60)
  )

/**
 * Rock paper scissors game
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<void>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true })

  const { timer, weapon }  = getInteractionOptions(interaction)
  
  const player = getUserPlayer(interaction.user, weapon)
  if (!interaction.channel) return playGameWithBot(interaction, player)
  
  const gameChannelOptions = gameChannels[interaction.channel.id] as GameChannelOptions
  if (!gameChannelOptions?.players) return initiateGame(interaction, player, timer)

  const existingPlayer = gameChannelOptions.players.find((foundPlayer) => foundPlayer.id === player.id)
  if (existingPlayer) return replyToExistingPlayer(interaction, existingPlayer)

  return addPlayerToTheGame(interaction, player)
}
