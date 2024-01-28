import { ChatInputCommandInteraction, UserMention, TextChannel } from 'discord.js'

import openAi        from '../../../../services/open-ai'
import getPrompt     from './get-prompt'
import { GameEvent } from './types.d'

/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<GameEvent>} - Game event
 */
export default async function generateEvent(interaction: ChatInputCommandInteraction): Promise<GameEvent> {
  const mention: UserMention = `<@${interaction.user.id}>`
  
  const result = await openAi.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'system', content: getPrompt(mention) }]
  })

  try {
    return JSON.parse(result.choices[0]?.message.content || '{}') 
  } catch (error) {
    if (error instanceof SyntaxError) {
      const errorsChannel = interaction.client.channels.cache.get('1200763445474238524') as TextChannel

      await errorsChannel.send(
        'Ошибка при парсинге JSON объекта. Событие не было добавлено в игру.' +
        `\nВот что сгенерировал бот:\n${result.choices[0]?.message.content}.` +
        `\nТекст ошибки: ${error}`
      )

      return generateEvent(interaction)
    }

    throw error
  }
}