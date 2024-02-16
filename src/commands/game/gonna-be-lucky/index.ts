import { ChatInputCommandInteraction, InteractionResponse, Message } from 'discord.js'

import { updateGameData }                 from '../../../../services/knex/base-queries/game-data'
import { getUserMainGameDataOrInsertNew } from '../../../../services/knex/base-queries/user'

import generateEvent   from './generate-event'
import replyWithEvent  from './reply-with-event'
import { GameTimeOut } from './types.d'

const gameTimeOut: GameTimeOut = {}

export const commandTimeout = 1000 * 60 * 60 // 1 hour

export const commandName = 'gonna-be-lucky'

/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<InteractionResponse<boolean> | Message<boolean>>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean> | Message<boolean>> {
  const userDiscordId = interaction.user.id

  const [game, event] = await Promise.all([
    getUserMainGameDataOrInsertNew({ discordId: userDiscordId }, 'gonnaBeLucky'),
    generateEvent(interaction),
    interaction.deferReply()
  ])

  const [, interactionResponse] = await Promise.all([
    updateGameData(game, event),
    replyWithEvent(interaction, event)
  ])

  gameTimeOut[userDiscordId] = new Date()

  return interactionResponse
}
