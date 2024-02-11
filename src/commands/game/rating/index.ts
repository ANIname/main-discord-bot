import { ChatInputCommandInteraction, InteractionResponse, Message } from 'discord.js'

import { getUsersRating } from '../../../../services/knex/base-queries/user'

export const commandName = 'rating'

/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<InteractionResponse<boolean> | Message<boolean>>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean> | Message<boolean>> {
  const limit = interaction.options.getNumber('limit') || 10
  
  const [usersRating] = await Promise.all([
    getUsersRating(limit),
    interaction.deferReply()
  ])

  const rating = usersRating
    .map((user, index) => `${index + 1}. <@${user.discordId}> - ${user.totalPoints}`)
    .join('\n')

  return interaction.editReply({ content: rating })
}