import type { ChatInputCommandInteraction, UserMention } from 'discord.js'

import type { APIPromise as ChatPromise } from 'openai/core.d'
import type { Stream as ChatStream }      from 'openai/streaming.d'
import type OpenAiTypes                   from 'openai/index.d'

import { openAi } from '../../../../services/open-ai'

import getPrompt from './get-prompt'

/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {ChatPromise<ChatStream<OpenAiTypes.ChatCompletionChunk>>} - Promise with event stream
 */
export default function generateEvent(interaction: ChatInputCommandInteraction): ChatPromise<ChatStream<OpenAiTypes.ChatCompletionChunk>> {
  const mention: UserMention = `<@${interaction.user.id}>`
  
  return openAi.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: getPrompt(mention) }],
    stream: true
  })
}