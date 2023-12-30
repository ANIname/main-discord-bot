import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import knex from '../../../../services/knex'
import generateEvent from './generate-event'
import replyWithEvent from './reply-with-event'
import saveEventToDatabase from './save-event-to-database'
import { GameTimeOut } from './types.d'

const timeOut = 1000 * 60 * 60 // 1 hour

const gameTimeOut: GameTimeOut = {}

export const data = new SlashCommandBuilder()
  .setName('gonna-be-lucky')
  .setDescription('Генерирует случайное событие и даёт или отнимает очки')

/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<void>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction) {
  const timeOutEnd = gameTimeOut[interaction.user.id] as Date | undefined

  if (timeOutEnd && Date.now() - timeOutEnd.getTime() < timeOut) {
    const waitTime = Math.floor((timeOut - (Date.now() - timeOutEnd.getTime())) / 1000 / 60)

    await interaction.reply({
      content: `Пожалуйста, наберитесь терпения! Подождите еще ${waitTime} мин. И я снова буду готова!`,
      ephemeral: true
    })

    return
  }

  const [event] = await Promise.all([
    generateEvent(`<@${interaction.user.id}>`),
    interaction.deferReply()
  ])

  const user = await knex('User').where({ discordId: interaction.user.id }).first() as { id: string }

  await Promise.all([
    saveEventToDatabase(user.id, event),
    replyWithEvent(interaction, event)
  ])

  gameTimeOut[interaction.user.id] = new Date()
}
