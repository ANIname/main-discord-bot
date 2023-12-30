import { ChatInputCommandInteraction } from 'discord.js'

import { getBotPlayer } from './get-player'
import playGame from './play-game'
import { Player } from './types.d'
import weapons from './weapons.json'

/**
 * Play game with bot
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {Player} userPlayer - Current user player
 * @returns {void} - Promise
 */
export default function playGameWithBot(interaction: ChatInputCommandInteraction, userPlayer: Player): void {
  const botPlayer = getBotPlayer(interaction.client.user)

  playGame([userPlayer, botPlayer])

  getGameResult(interaction, userPlayer, botPlayer)
}

/**
 * Get game result
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {Player} userPlayer - Current user player
 * @param {Player} botPlayer - Bot player
 * @returns {void} - Promise
 */
function getGameResult(interaction: ChatInputCommandInteraction, userPlayer: Player, botPlayer: Player): void {
  const isDraw        = userPlayer.status === 'draw'
  const doesPlayerWin = userPlayer.status === 'win'
  const playerChoice  = weapons[userPlayer.choice]
  const botChoice     = weapons[botPlayer.choice]

  const messageForDraw = `🤝 Ничья! Мы оба выбрали: ${playerChoice}`
  const messageForWin  = `🎉 Вы выиграли! Ваш выбор: ${playerChoice}, мой выбор: ${botChoice}`
  const messageForLose = `😭 Вы проиграли! Ваш выбор: ${playerChoice}, мой выбор: ${botChoice}`

  isDraw
    ? interaction.editReply({ content: messageForDraw })
    : interaction.editReply({ content: doesPlayerWin ? messageForWin : messageForLose })
}