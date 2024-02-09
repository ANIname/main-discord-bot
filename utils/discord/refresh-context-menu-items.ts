import { ClientUser, REST, Routes } from 'discord.js'
import map                          from 'lodash/map'

import contextMenu from '../../src/context-menu'

const { DISCORD_BOT_TOKEN } = process.env

/**
 * Refresh context menu items
 * @param {ClientUser} bot - Discord Bot Client
 * @returns {Promise<void>}
 */
export default function refreshContextMenuItems (bot: ClientUser) {
  const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN as string)

  const routeApplicationCommands = Routes.applicationCommands(bot.id)

  return rest.put(routeApplicationCommands, { body: map(contextMenu, 'data') })
}