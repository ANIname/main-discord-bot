import { Snowflake } from 'discord.js'
import * as uuid from 'uuid'

import knex from '../../../../services/knex'
import { GameEvent } from './types.d'

/**
 * Save event to database
 * @param {Snowflake} userId - Discord user id
 * @param {GameEvent} event - Game Event
 */
export default async function saveEventToDatabase(userId: Snowflake, event: GameEvent) {
  const game = await getUserGame(userId)

  await updateUserGame(game, event)
}

/**
 * Get user game data
 * @param {Snowflake} userId - Discord user id
 * @returns {Promise<{ id: string }>} - Promise
 */
async function getUserGame(userId: Snowflake) {
  const mainGameData = await getMainGameData(userId) || await insertMainGameData(userId)

  return await getUserGameData(mainGameData.id) || await insertUserGameData(mainGameData.id)
}

/**
 * Update user game data
 * @param {object} game - User game data
 * @param {string} game.id - Game id
 * @param {number} game.points - Game points
 * @param {GameEvent} event - Game Event
 * @returns {Promise<void>} - Promise
 */
function updateUserGame(game: { id: string, points: number }, event: GameEvent) {
  return Promise.all([
    knex('GameGonnaBeLucky').where({ id: game.id }).update({ points: game.points + event.points }),
    knex('GameGonnaBeLuckyEvent').insert({ id: uuid.v4(), gameGonnaBeLuckyId: game.id, ...event })
  ])
}

/**
 * Get game data from database
 * @param {Snowflake} userId - Discord user id
 * @returns {Promise<{ id: string }>} - Promise
 */
function getMainGameData(userId: Snowflake) {
  return knex('Game')
    .where({ userId, title: 'gonnaBeLucky' })
    .select('id')
    .first() as Promise<{ id: string }>
}

/**
 * Insert game data to database
 * @param {Snowflake} userId - Discord user id
 * @returns {Promise<{ id: string }>} - Promise
 */
function insertMainGameData(userId: Snowflake) {
  return knex('Game')
    .insert({ id: uuid.v4(), userId, title: 'gonnaBeLucky' })
    .returning('id')
    .then(([user]) => user) as Promise<{ id: string }>
}

/**
 * Get game from database
 * @param {string} gameId - Game id
 * @returns {Promise<{ id: string }>} - Promise
 */
function getUserGameData(gameId: string) {
  return knex('GameGonnaBeLucky')
    .where({ gameId })
    .select('id', 'points')
    .first() as Promise<{ id: string, points: number }>
}

/**
 * Insert game to database
 * @param {string} gameId - Game id
 * @returns {Promise<{ id: string }>} - Promise
 */
function insertUserGameData(gameId: string) {
  return knex('GameGonnaBeLucky')
    .insert({ id: uuid.v4(), gameId, points: 0 })
    .returning(['id', 'points'])
    .then(([game]) => game) as Promise<{ id: string, points: number }>
}
