import { ClientUser, Guild, REST, Routes } from 'discord.js'
import map                                 from 'lodash/map'

import commands from '../../src/commands'

const { DISCORD_BOT_TOKEN } = process.env

/**
 * Refresh interaction commands
 * @param {ClientUser} bot - Discord Bot Client
 * @param {Guild} guild - Discord Guild
 * @returns {Promise<void>}
 */
export default function (bot: ClientUser, guild: Guild) {
  const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN as string)

  const routeApplicationGuildCommands = Routes.applicationGuildCommands(bot.id, guild.id)

  return rest.put(routeApplicationGuildCommands, { body: map(commands, 'data') })
}