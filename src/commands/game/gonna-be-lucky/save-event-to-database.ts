import { getMainGameData, insertMainGameData, updateGameData } from '../../../../services/knex/base-queries/game-data'
import { GameEvent } from './types.d'

/**
 * Save event to database
 * @param {string} userId - User UUID
 * @param {GameEvent} event - Game Event
 * @returns {Promise<void>} - Promise
 */
export default async function saveEventToDatabase(userId: string, event: GameEvent) {
  // Get user game or create new
  const game = await getMainGameData(userId, 'gonnaBeLucky') || await insertMainGameData(userId, 'gonnaBeLucky')

  return updateGameData(game, event)
}