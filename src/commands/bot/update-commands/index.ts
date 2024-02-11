import { ChatInputCommandInteraction, REST, Routes } from 'discord.js'

import { getCommands } from './get-commands'

const { DISCORD_BOT_TOKEN } = process.env

export const commandName = 'update-commands'

/**
 * Update all discord bot commands
 * @param {ChatInputCommandInteraction} interaction - Represents a command interaction
 * @returns {Promise<unknown>} - Promise with unknown result
 */
export async function execute (interaction: ChatInputCommandInteraction): Promise<unknown> {
  const commands = await getCommands()

  const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN as string)

  const routeApplicationCommands = Routes.applicationCommands(interaction.client.user.id)

  return rest.put(routeApplicationCommands, { body: commands })
}
