import type { ChatInputCommandInteraction } from 'discord.js'

import type { ChatCompletionChunk } from 'openai/resources/chat/completions'

import type { GameEvent } from './types'

/**
 * Reply to user
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {AsyncIterable<ChatCompletionChunk>} eventStream - Event stream
 * @returns {Promise<GameEvent>} - Promise with game event
 */
export default async function replyWithEvent (interaction: ChatInputCommandInteraction, eventStream: AsyncIterable<ChatCompletionChunk>): Promise<GameEvent> {
  let counter         = 0
  let ChatGPTResponse = ''
  let messageToSend   = ''

  let isEventMessageCollected     = false
  let isCollectedEventMessageSent = false
  
  for await (const chunk of eventStream) {
    counter++

    ChatGPTResponse += chunk.choices[0]?.delta?.content || ''

    if (!isEventMessageCollected) {
      messageToSend = ChatGPTResponse

      if (messageToSend.includes('\n')) {
        messageToSend = messageToSend.slice(0, messageToSend.indexOf('\n'))

        isEventMessageCollected = true
      }
    }

    if (messageToSend.length <= 21 || isCollectedEventMessageSent) continue

    if (counter % 5 === 0) {
      await interaction.editReply({ content: messageToSend })
    }

    if (isEventMessageCollected && !isCollectedEventMessageSent) {
      await interaction.editReply({ content: messageToSend })

      isCollectedEventMessageSent = true
    }
  }

  const [eventText, points, declination] = ChatGPTResponse.split('\n')

  return {
    data: eventText as string,
    points: Number(points),
    declination: declination as string
  }
}