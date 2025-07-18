import type { ChatInputCommandInteraction } from 'discord.js'

import type { ChatCompletionChunk } from 'openai/resources/chat/completions'

import { upsertUser }    from '../../../../services/prisma/base-queries/user'
import { saveGameEvent } from '../../../../services/prisma/base-queries/game'

import generateEffect  from './generate-event'
import replyWithEffect from './reply-with-event'

export const commandName = 'potion-brew'

/**
 * Brews a luck potion and generates a random effect
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<void>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const userDiscordId = interaction.user.id
  const ingredients   = interaction.options.getString('ingredients')?.split(',') || []

  // TODO it's temporary solution. Only for testing.
  if (ingredients.length === 0) {
    ingredients.push('морковка')
    ingredients.push('лук')
    ingredients.push('чеснок')
    ingredients.push('петрушка')
    ingredients.push('укроп')
    ingredients.push('майонез')
    ingredients.push('горчица')
    ingredients.push('соль')
  }

  const results = await Promise.all([
    generateEffect(interaction, ingredients),
    upsertUser(userDiscordId),
    interaction.deferReply(),
  ])
  
  const [effectStream, userId] = results as [AsyncIterable<ChatCompletionChunk>, string, unknown]

  const effect = await replyWithEffect(interaction, effectStream)

  await saveGameEvent(userId, 'potionBrewing', effect)
} 