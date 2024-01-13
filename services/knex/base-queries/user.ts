import { pascal as pascalCase } from 'case'
import { Snowflake } from 'discord.js'
import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'

import knex from '..'
import { availableGames } from '../enum'
import { GameTitle, MainGameData } from '../types.d'
import { getMainGameDataOrInsertNew } from './game-data'

/**
 * Get the user ID by Discord ID
 * @param {Snowflake} discordId - User Discord ID
 * @returns {Promise<string>} - User ID
 */
export const getUserId = (discordId: Snowflake): Promise<string> => knex('User')
  .where({ discordId })
  .select('id')
  .first()
  .then(({ id }) => id)

/**
 *
 * @param {Snowflake} discordId - User Discord ID
 * @param {GameTitle} title - Game title
 * @returns {Promise<MainGameData>} - Game data
 */
export async function getUserMainGameDataOrInsertNew (discordId: Snowflake, title: GameTitle): Promise<MainGameData> {
  const userId = await getUserId(discordId)

  return getMainGameDataOrInsertNew(userId, title)
}

/**
 * Get the total points of a user
 * @param {Snowflake} discordId - User Discord ID
 * @returns {Promise<number>} - Total points
 */
export async function getUserTotalPoints (discordId: Snowflake): Promise<number> {
  const userId = await getUserId(discordId)

  let userGamesQuery = knex('Game').where({ userId })

  forEach(availableGames, (gameTitle) => {
    const gameName = pascalCase(`Game-${gameTitle}`)

    userGamesQuery = userGamesQuery
      .leftJoin(gameName, 'Game.id', `${gameName}.gameId`)
      .select(`${gameName}.points`)
  })

  const userGames = await userGamesQuery

  return reduce(userGames, (accumulator, game) => accumulator + game.points, 0)
}