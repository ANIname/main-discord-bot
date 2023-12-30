import { UserMention } from 'discord.js'

import openAi        from '../../../../services/open-ai'
import getPrompt     from './get-prompt'
import { GameEvent } from './types.d'

/**
 * Generates a random event and gives or takes away points
 * @param {UserMention} mention - Discord user mention
 * @returns {Promise<GameEvent>} - Game event
 */
export default async function generateEvent(mention: UserMention): Promise<GameEvent> {
  const result = await openAi.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'system', content: getPrompt(mention) }]
  })

  return JSON.parse(result.choices[0]?.message.content || '{}') 
}