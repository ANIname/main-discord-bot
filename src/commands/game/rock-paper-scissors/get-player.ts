import { ClientUser, User } from 'discord.js'

import { Player, Weapon } from './types.d'
import weapons from './weapons.json'

/**
 * Get bot player
 * @param {ClientUser} bot - Bot user
 * @returns {Player} Bot player
 */
export const getBotPlayer = (bot: ClientUser): Player => ({
  id:     bot.id,
  choice: Object.keys(weapons)[Math.floor(Math.random() * 3)] as Weapon,
  status: 'lose'
})

/**
 * Get user player
 * @param {User} user - User
 * @param {Weapon} weapon - Weapon
 * @returns {Player} Player
 */
export const getUserPlayer = (user: User, weapon: Weapon): Player => ({
  id:     user.id,
  choice: weapon,
  status: 'lose'
})