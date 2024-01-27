import { ChatInputCommandInteraction, InteractionResponse, Message } from 'discord.js'

import { updateGameData } from '../../../../services/knex/base-queries/game-data'
import { getUserMainGameDataOrInsertNew } from '../../../../services/knex/base-queries/user'
import generateEvent from './generate-event'
import replyThatNeedToWait from './reply-that-need-to-wait'
import replyWithEvent from './reply-with-event'
import { GameTimeOut } from './types.d'

const timeOut = 1000 * 60 * 60 // 1 hour

const gameTimeOut: GameTimeOut = {}

export * from './data'

/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<InteractionResponse<boolean> | Message<boolean>>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean> | Message<boolean>> {
  const userDiscordId = interaction.user.id

  // eslint-disable-next-line security/detect-object-injection
  const timeOutEnd = gameTimeOut[userDiscordId] as Date | undefined
  const needToWait = timeOutEnd && Date.now() - timeOutEnd.getTime() < timeOut

  if (needToWait) return replyThatNeedToWait(interaction, timeOut, timeOutEnd)

  const [game, event] = await Promise.all([
    getUserMainGameDataOrInsertNew({ discordId: userDiscordId }, 'gonnaBeLucky'),
    generateEvent(interaction),
    interaction.deferReply()
  ])

  const [, interactionResponse] = await Promise.all([
    updateGameData(game, event),
    replyWithEvent(interaction, event)
  ])

  // eslint-disable-next-line security/detect-object-injection
  gameTimeOut[userDiscordId] = new Date()

  return interactionResponse
}
