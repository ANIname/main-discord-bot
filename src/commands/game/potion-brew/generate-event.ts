import type { ChatInputCommandInteraction, UserMention } from 'discord.js'

import type { ChatCompletionChunk } from 'openai/resources/chat/completions'

import { openAi } from '../../../../services/open-ai'

import getPrompt from './get-prompt'

/**
 * Generates a random potion effect using OpenAI
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {string[]} ingredients - Selected ingredients
 * @returns {Promise<AsyncIterable<ChatCompletionChunk>>} - Promise with effect stream
 */
export default function generateEffect(interaction: ChatInputCommandInteraction, ingredients: string[]): Promise<AsyncIterable<ChatCompletionChunk>> {
  const mention: UserMention = `<@${interaction.user.id}>`

  return openAi.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: getPrompt(mention, ingredients) }],
    stream: true
  })
} 