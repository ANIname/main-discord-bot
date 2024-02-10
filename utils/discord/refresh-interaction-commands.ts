import { ClientUser, REST, Routes } from 'discord.js'
import map                          from 'lodash/map'

import interactionCommands from '../../src/commands'
import contextMenuCommands from '../../src/context-menu'

const { DISCORD_BOT_TOKEN } = process.env

/**
 * Refresh interaction commands
 * @param {ClientUser} bot - Discord Bot Client
 * @returns {Promise<void>}
 */
export default async function refreshInteractionCommands (bot: ClientUser) {
  const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN as string)

  const routeApplicationCommands = Routes.applicationCommands(bot.id)

  const commandsData = [
    ...map(interactionCommands, 'data'),
    ...map(contextMenuCommands, 'data')
  ]

  return rest.put(routeApplicationCommands, { body: commandsData })
}