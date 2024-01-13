import { Snowflake } from 'discord.js'

import knex from '..'
import { GameTitle, MainGameData } from '../types.d'
import { getMainGameDataOrInsertNew } from './game-data'

/**
 * Get the user ID by Discord ID
 * @param {Snowflake} discordId - Discord ID
 * @returns {Promise<string>} - User ID
 */
export const getUserId = (discordId: Snowflake): Promise<string> => knex('User')
  .where({ discordId })
  .select('id')
  .first()
  .then(({ id }) => id)

/**
 *
 * @param {Snowflake} discordId - Discord ID
 * @param {GameTitle} title - Game title
 * @returns {Promise<MainGameData>} - Game data
 */
export async function getUserMainGameDataOrInsertNew (discordId: Snowflake, title: GameTitle): Promise<MainGameData> {
  const userId = await getUserId(discordId)

  return getMainGameDataOrInsertNew(userId, title)
}