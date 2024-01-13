import { ChatInputCommandInteraction, InteractionResponse } from 'discord.js'

/**
 * Reply and say that player already in game
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {number} timeOut - Time out in milliseconds
 * @param {Date} timeOutEnd - Time out end date
 * @returns {Promise<InteractionResponse<boolean>>} - Promise
 */
export default function replyThatNeedToWait(interaction: ChatInputCommandInteraction, timeOut: number, timeOutEnd: Date): Promise<InteractionResponse<boolean>> {
  const waitTime = Math.floor((timeOut - (Date.now() - timeOutEnd.getTime())) / 1000 / 60)

  return interaction.reply({
    content: `Пожалуйста, наберитесь терпения! Подождите еще ${waitTime} мин. И я снова буду готова!`,
    ephemeral: true
  })
}