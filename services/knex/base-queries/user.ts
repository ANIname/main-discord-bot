import { pascal as pascalCase } from 'case'
import { Snowflake } from 'discord.js'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import reduce from 'lodash/reduce'

import knex from '..'
import { availableGames } from '../enum'
import { GameTitle, MainGameData, UserRating } from '../types.d'
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
  .then((user) => user?.id)

/**
 *
 * @param {{ id?: string, discordId?: Snowflake }} options - User ID (UUID or Discord ID)
 * @param {string} options.id - User UUID
 * @param {Snowflake} options.discordId - User Discord ID
 * @param {GameTitle} title - Game title
 * @returns {Promise<MainGameData>} - Game data
 */
export async function getUserMainGameDataOrInsertNew (options: { id?: string, discordId?: Snowflake }, title: GameTitle): Promise<MainGameData> {
  if (!options.id && !options.discordId) throw new Error('User ID or Discord ID must be specified')

  const userId = options.id || await getUserId(options.discordId as Snowflake)

  return getMainGameDataOrInsertNew(userId, title)
}

/**
 * Get the total points of a user
 * @param {Snowflake} discordId - User Discord ID
 * @param {GameTitle[]} omitGames - Omit games
 * @returns {Promise<number>} - Total points
 */
export async function getUserTotalPoints (discordId: Snowflake, omitGames: GameTitle[] = []): Promise<number> {
  const userId = await getUserId(discordId)

  let userGamesQuery = knex('Game').where({ userId })

  forEach(availableGames, (gameTitle) => {
    if (omitGames.includes(gameTitle)) return

    const gameName = pascalCase(`Game-${gameTitle}`)

    userGamesQuery = userGamesQuery
      .leftJoin(gameName, 'Game.id', `${gameName}.gameId`)
      .select(`${gameName}.points`)
  })

  const userGames = await userGamesQuery

  return reduce(userGames, (accumulator, game) => accumulator + game.points, 0)
}

/**
 * Get the users rating
 * @param {number} limit - Limit of users
 * @returns {Promise<UserRating[]>} - Users rating
 */
export async function getUsersRating (limit = 10): Promise<UserRating[]> {
  const usersQuery = knex('User')
    .leftJoin('Game', 'User.id', 'Game.userId')
    .select('User.discordId')
    .groupBy('User.discordId')

  const havingRawParts:  string[] = []
  const orderByRawParts: string[] = []

  forEach(availableGames, (gameTitle) => {
    const gameName = pascalCase(`Game-${gameTitle}`)

    // Add each game points to the query
    usersQuery
      .leftJoin(gameName, 'Game.id', `${gameName}.gameId`)
      .sum(`${gameName}.points as ${gameTitle}Points`)

    // Add each game points to the having query parts
    havingRawParts.push(`COALESCE(sum("${gameName}"."points"), 0)`);

    // Add each game points to the order by query parts
    orderByRawParts.push(`COALESCE(sum("${gameName}"."points"), 0)`)
  })

  // Combine all parts for having and order by queries
  const havingRawQuery  = havingRawParts.join(' + ') + ' > 0';
  const orderByRawQuery = orderByRawParts.join(' + ') + ' DESC'

  const users = await usersQuery
    .having(knex.raw(havingRawQuery))
    .orderByRaw(orderByRawQuery)
    .limit(limit)

  return map(users, ({ discordId, ...pointsPerGames }) => ({
    discordId: discordId as Snowflake,
    totalPoints: reduce(pointsPerGames, (accumulator, points) => accumulator + Number(points) || 0, 0)
  }))
}