import { ChatInputCommandInteraction, Message } from 'discord.js'

import {  Player } from '../types.d'
import { getLocalisedMessage, getPlayerChoice } from './locales'

/**
 * Reply with result
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {Player[]} players - Players in the game
 * @returns {Promise<Message<boolean>>} - Interaction response
 */
export default function replyWithResult(interaction: ChatInputCommandInteraction, players: Player[]): Promise<Message<boolean>> {
  const [userPlayer, botPlayer] = players as [Player, Player]

  const isDraw           = userPlayer.status === 'draw'
  const doesPlayerWin    = userPlayer.status === 'win'

  const userPlayerChoice = getPlayerChoice(interaction.locale, userPlayer)
  const botPlayerChoice  = getPlayerChoice(interaction.locale, botPlayer)
  const messageForDraw   = getLocalisedMessage(interaction.locale, 'draw', userPlayerChoice, botPlayerChoice)
  const messageForWin    = getLocalisedMessage(interaction.locale, 'win', userPlayerChoice, botPlayerChoice)
  const messageForLose   = getLocalisedMessage(interaction.locale, 'lose', userPlayerChoice, botPlayerChoice)

  return isDraw
    ? interaction.editReply(messageForDraw)
    : interaction.editReply({ content: doesPlayerWin ? messageForWin : messageForLose })
}