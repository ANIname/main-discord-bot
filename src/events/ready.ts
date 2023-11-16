import { Client, REST, Routes } from 'discord.js'
import map from 'lodash/map'

import commands from '../commands'

const { DISCORD_BOT_TOKEN } = process.env

/**
 * Ready event
 * @param {Client} client - Discord Client
 */
export default async function ready (client: Client) {
  await refreshInteractionCommands(client)
  
  console.log(`${client.user?.username} bot is ready!`)
}

/**
 *
 * @param {Client} client - Discord Client
 */
async function refreshInteractionCommands (client: Client) {
  const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN as string)
  const guild = client.guilds.cache.first()

  if (!guild) throw new Error('No guild found')
  if (!client.user) throw new Error('Bot is not logged in')

  const routeApplicationGuildCommands = Routes.applicationGuildCommands(client.user.id, guild.id)

  await rest.put(routeApplicationGuildCommands, { body: map(commands, 'data') })
}