import { ChatInputCommandInteraction, Client, ContextMenuCommandInteraction } from 'discord.js'

import commands from '../commands'

/**
 * Emitted when an interaction is created
 * @param {Client} _ - Discord Client
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 */
export default function interactionCreate(_: Client, interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction) {
  // TODO проверить можно ли изменить условие
  if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return
  
  const command = commands[interaction.commandName]
  
  if (command) command(interaction)
}