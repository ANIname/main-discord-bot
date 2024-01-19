import { ChatInputCommandInteraction, Message } from 'discord.js'

import addPoints from './add'
import removePoints from './remove'
import setPoints from './set'

const subCommands = {
  add: addPoints,
  remove: removePoints,
  set: setPoints
}

type InteractionSubCommand = keyof typeof subCommands

export * from './data'

/**
 * Bulk delete messages
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<Message<boolean>>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction): Promise<Message<boolean>> {
  await interaction.deferReply({ ephemeral: true })
  
  const subCommand = interaction.options.getSubcommand() as InteractionSubCommand

  // eslint-disable-next-line security/detect-object-injection
  return subCommands[subCommand](interaction)
}