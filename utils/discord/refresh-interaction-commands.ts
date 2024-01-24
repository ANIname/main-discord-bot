import { ClientUser, REST, Routes } from 'discord.js'
import map                          from 'lodash/map'

import commands from '../../src/commands'

const { DISCORD_BOT_TOKEN } = process.env

/**
 * Refresh interaction commands
 * @param {ClientUser} bot - Discord Bot Client
 * @returns {Promise<void>}
 */
export default function refreshInteractionCommands (bot: ClientUser) {
  const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN as string)

  const routeApplicationCommands = Routes.applicationCommands(bot.id)

  return rest.put(routeApplicationCommands, { body: map(commands, 'data') })
}