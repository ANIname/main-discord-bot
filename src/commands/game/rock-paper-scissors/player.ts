import { ChatInputCommandInteraction, StringSelectMenuInteraction } from 'discord.js'

import { getUserId, getUserTotalPoints } from '../../../../services/knex/base-queries/user'
import { GameStatus, InteractionOptions, Player, Weapon } from './types.d'
import weapons from './weapons.json'

const getRandomWeaponNumber = (): number => Math.floor(Math.random() * Object.keys(weapons).length)
const getRandomWeapon       = (): Weapon => Object.keys(weapons)[getRandomWeaponNumber()] as Weapon

export const updatePlayerStatus = (player: Player, status: GameStatus): Player => ({
  ...player,
  status
})

export const getBotPlayer = async (interaction: ChatInputCommandInteraction | StringSelectMenuInteraction): Promise<Player> => ({
  id: await getUserId(interaction.client.user.id),
  discordId: interaction.client.user.id,
  weapon: getRandomWeapon(),
  status: 'lose',
  points: 0
})

/**
 * Get the user player
 * @param {ChatInputCommandInteraction | StringSelectMenuInteraction} interaction - Discord Interaction
 * @param {InteractionOptions} interactionOptions - Interaction options
 * @returns {Promise<Player>} - Player
 */
export async function getUserPlayer(
  interaction: ChatInputCommandInteraction | StringSelectMenuInteraction,
  interactionOptions: InteractionOptions
): Promise<Player> {
  const [userId, userTotalPoints] = await Promise.all([
    getUserId(interaction.user.id),
    getUserTotalPoints(interaction.user.id)
  ])

  return {
    id: userId,
    discordId: interaction.user.id,
    weapon: interactionOptions.weapon,
    status: 'lose',
    points: userTotalPoints
  }
}