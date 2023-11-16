import { ChatInputCommandInteraction, Client } from 'discord.js'

import commands from '../commands'

/**
 * InteractionCreate event
 * @param {Client} _ - Discord Client
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 */
export default function interactionCreate(_: Client, interaction: ChatInputCommandInteraction) {
  if (!interaction.isChatInputCommand()) return
  
  const command = commands[interaction.commandName]

  if (!command) return

  command.execute(interaction)
}