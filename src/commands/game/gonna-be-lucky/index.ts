import type { ChatInputCommandInteraction } from 'discord.js'

import type { ChatCompletionChunk } from 'openai/resources/chat/completions'

import { upsertUser }    from '../../../../services/prisma/base-queries/user'
import { saveGameEvent } from '../../../../services/prisma/base-queries/game'

import generateEvent  from './generate-event'
import replyWithEvent from './reply-with-event'

export const commandName = 'gonna-be-lucky'

/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<void>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const userDiscordId = interaction.user.id

  const results = await Promise.all([
    generateEvent(interaction),
    upsertUser(userDiscordId),
    interaction.deferReply(),
  ])
  
  const [eventStream, userId] = results as [AsyncIterable<ChatCompletionChunk>, string, unknown]

  const event = await replyWithEvent(interaction, eventStream)

  await saveGameEvent(userId, 'gonnaBeLucky', event)
}
