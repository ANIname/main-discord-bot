import { pascal as pascalCase } from 'case'
import camelCase from 'lodash/camelCase'
import { v4 as uuid } from 'uuid'

import knex from '..'
import { GameTitle, MainGameData, MainGameEvent } from '../types.d'

/**
 * Get the main game data for a user
 * @param {string} userId - User UUID
 * @param {GameTitle} title - Game title
 * @returns {Promise<MainGameData>} - Game data
 */
export function getMainGameData(userId: string, title: GameTitle): Promise<MainGameData> {
  const gameName = pascalCase(`Game-${title}`)
  
  return knex('Game')
    .where({ userId, title })
    .leftJoin(gameName, 'Game.id', `${gameName}.gameId`)
    .select('Game.title', `${gameName}.id`, `${gameName}.points`)
    .first()
}

/**
 * Insert the main game data for a user
 * @param {string} userId - User UUID
 * @param {GameTitle} title - Game title
 * @returns {Promise<MainGameData>} - Game data
 */
export async function insertMainGameData(userId: string, title: GameTitle): Promise<MainGameData> {
  const gameName = pascalCase(`Game-${title}`)

  const game = await knex('Game')
    .insert({ id: uuid(), userId, title })
    .returning('id')
    .then(([game]) => game) as { id: string }

  const gameData = await knex(gameName)
    .insert({ id: uuid(), gameId: game.id, points: 0 })
    .returning(['id', 'points'])
    .then(([gameData]) => gameData) as { id: string, points: number  }

  return { title, ...gameData }
}

/**
 * Get the main game data for a user or insert new
 * @param {string} userId - User UUID
 * @param {GameTitle} title - Game title
 * @returns {Promise<MainGameData>} - Game data
 */
export async function getMainGameDataOrInsertNew(userId: string, title: GameTitle): Promise<MainGameData> {
  return await getMainGameData(userId, title) || await insertMainGameData(userId, title)
}

/**
 * Update the main game data for a user
 * @param {MainGameData} foundGame - Game data
 * @param {MainGameEvent} event - Game event
 * @param {boolean} setPoints - Set points
 * @returns {Promise<void>} - Promise
 */
export async function updateGameData(foundGame: MainGameData, event: MainGameEvent, setPoints = false) {
  const gameName = pascalCase(`Game-${foundGame.title}`)
  const gameReference = camelCase(`game-${foundGame.title}-id`)

  const points = (setPoints) ? event.points : foundGame.points + event.points

  const updatePoints = () => knex(gameName)
    .where({ id: foundGame.id })
    .update({ points })

  const insertEvent = () => knex(`${gameName}Event`)
    .insert({ id: uuid(), [gameReference]: foundGame.id, ...event })

  return Promise.all([updatePoints(), insertEvent()])
}