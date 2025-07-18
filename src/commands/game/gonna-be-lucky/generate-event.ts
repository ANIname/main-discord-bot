import type { ChatInputCommandInteraction, UserMention } from 'discord.js'

import type { ChatCompletionChunk } from 'openai/resources/chat/completions'

import { openAi } from '../../../../services/open-ai'

import getPrompt from './get-prompt'

/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<AsyncIterable<ChatCompletionChunk>>} - Promise with event stream
 */
export default function generateEvent(interaction: ChatInputCommandInteraction): Promise<AsyncIterable<ChatCompletionChunk>> {
  const mention: UserMention = `<@${interaction.user.id}>`
  
  return openAi.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: getPrompt(mention) }],
    stream: true
  })
}