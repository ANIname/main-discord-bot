import { ChatInputCommandInteraction, Message } from 'discord.js'

import playGame from '../play-game'
import { getBotPlayer, getUserPlayer } from '../player'
import { InteractionOptions } from '../types.d'
import replyWithResult from './reply-with-result'

/**
 * Play game with bot
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {InteractionOptions} interactionOptions - Interaction options
 * @returns {Promise<Message<boolean>>} - Interaction response
 */
export default async function playGameWithBot(interaction: ChatInputCommandInteraction, interactionOptions: InteractionOptions): Promise<Message<boolean>> {
  const [userPlayer, botPlayer] = await Promise.all([
    getUserPlayer(interaction, interactionOptions),
    getBotPlayer(interaction)
  ])

  const playedPlayers = playGame([userPlayer, botPlayer])

  return replyWithResult(interaction, playedPlayers)
}
