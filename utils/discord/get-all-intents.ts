import { GatewayIntentBits } from 'discord.js'
import forEach               from 'lodash/forEach'

/**
 * Because we use this bot like a main bot, we need all intents.
 * This function returns all intents.
 * @returns {GatewayIntentBits[]} - All intents
 */
export default function getAllIntents (): GatewayIntentBits[] {
  const intents: GatewayIntentBits[] = []

  forEach(GatewayIntentBits, (value) => {
    if (typeof value === 'number') intents.push(value)
  })

  return intents
}