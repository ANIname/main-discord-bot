import { ChatInputCommandInteraction, Message } from 'discord.js'

import initiateGameWithPlayers from './initiate-game-with-players'
import playGameWithBot from './play-game-with-bot'
import prepareInteractionOptions from './prepare-interaction-options'

export * from './data'

/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<Message<boolean>>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction): Promise<Message<boolean>> {
  await interaction.deferReply({ ephemeral: true })

  const interactionOptions = prepareInteractionOptions(interaction)

  return (interaction.channel)
    ? initiateGameWithPlayers(interaction, interactionOptions)
    : playGameWithBot(interaction, interactionOptions)
}