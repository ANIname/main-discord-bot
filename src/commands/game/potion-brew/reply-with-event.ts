import type { ChatInputCommandInteraction } from 'discord.js'

import type { ChatCompletionChunk } from 'openai/resources/chat/completions'

import type { GameEvent } from './types'

/**
 * Reply to user with the potion effect
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {AsyncIterable<ChatCompletionChunk>} effectStream - Effect stream
 * @returns {Promise<GameEvent>} - Promise with game event
 */
export default async function replyWithEffect (interaction: ChatInputCommandInteraction, effectStream: AsyncIterable<ChatCompletionChunk>): Promise<GameEvent> {
  let counter         = 0
  let ChatGPTResponse = ''
  let messageToSend   = ''

  let isEffectMessageCollected     = false
  let isCollectedEffectMessageSent = false
  
  for await (const chunk of effectStream) {
    counter++

    ChatGPTResponse += chunk.choices[0]?.delta?.content || ''

    if (!isEffectMessageCollected) {
      messageToSend = ChatGPTResponse

      if (messageToSend.includes('\n')) {
        messageToSend = messageToSend.slice(0, messageToSend.indexOf('\n'))

        isEffectMessageCollected = true
      }
    }

    if (messageToSend.length <= 21 || isCollectedEffectMessageSent) continue

    if (counter % 5 === 0) {
      await interaction.editReply({ content: messageToSend })
    }

    if (isEffectMessageCollected && !isCollectedEffectMessageSent) {
      await interaction.editReply({ content: messageToSend })

      isCollectedEffectMessageSent = true
    }
  }

  const [effectText, points, declination] = ChatGPTResponse.split('\n')

  return {
    data: effectText as string,
    points: Number(points),
    declination: declination as string
  }
} 