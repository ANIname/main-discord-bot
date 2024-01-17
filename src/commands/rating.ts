import { ChatInputCommandInteraction, InteractionResponse, Message, SlashCommandBuilder } from 'discord.js'

import { getUsersRating } from '../../services/knex/base-queries/user'

export const data = new SlashCommandBuilder()
  .setName('rating')
  .setNameLocalizations({ 'uk': 'рейтинг', 'ru': 'рейтинг' })
  .setDescription('Shows server members rating')
  .setDescriptionLocalizations({
    'uk': 'Показує рейтинг учасників серверу',
    'ru': 'Показывает рейтинг участников сервера'
  })


/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<InteractionResponse<boolean> | Message<boolean>>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean> | Message<boolean>> {
  const [usersRating] = await Promise.all([
    getUsersRating(),
    interaction.deferReply()
  ])

  const rating = usersRating
    .map((user, index) => `${index + 1}. <@${user.discordId}> - ${user.totalPoints}`)
    .join('\n')

  return interaction.editReply({ content: rating })
}