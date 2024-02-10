import { ChatInputCommandInteraction, Client, ContextMenuCommandInteraction } from 'discord.js'

import commands            from '../commands'
import contextMenuCommands from '../context-menu'

/**
 * Emitted when an interaction is created
 * @param {Client} _ - Discord Client
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 */
export default function interactionCreate(_: Client, interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction) {
  if (interaction.isChatInputCommand()) {
    const command = commands[interaction.commandName]

    if (command) command.execute(interaction)

    return
  }

  if (interaction.isContextMenuCommand()) {
    const command = contextMenuCommands[interaction.commandName]

    if (command) command.execute(interaction)
  }
}