import declineWord from 'decline-word'
import { ChatInputCommandInteraction, GuildMember, Message } from 'discord.js'

import { updateGameData } from '../../../services/knex/base-queries/game-data'
import { getUserMainGameDataOrInsertNew, getUserTotalPoints } from '../../../services/knex/base-queries/user'

type SupportedLocale = 'uk' | 'ru' | 'en-US'

const availableLocales = new Set(['uk', 'ru', 'en-US'])

const messageLocales = {
  'uk': (member: GuildMember, points: number, reason: string) => `Участнику <@${member.id}> встановлено **${points}** ${declineWord(points, 'оч', 'ко', 'ка', 'ок')}. Причина: "${reason}"`,
  'ru': (member: GuildMember, points: number, reason: string) => `Участнику <@${member.id}> установлено **${points}** ${declineWord(points, 'очк', 'о', 'а', 'ов')}. Причина: "${reason}"`,
  'en-US': (member: GuildMember, points: number, reason: string) => `Member <@${member.id}> set **${points}** ${declineWord(points, 'point', 's', 's', 's')}. Reason: "${reason}"`
}

/**
 * Add points to member
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<Message<boolean>>} - Promise
 */
export default async function addPoints(interaction: ChatInputCommandInteraction): Promise<Message<boolean>> {
  const localeString = availableLocales.has(interaction.locale) ? interaction.locale as SupportedLocale : 'en-US'

  const member = interaction.options.getMember('member') as GuildMember
  const points = interaction.options.getNumber('amount', true)
  const reason = interaction.options.getString('reason', true)
  const sendMessage = interaction.options.getBoolean('send-message', true)

  const userPoints = await getUserTotalPoints(member.id, ['discordGuild'])

  const gameData = await getUserMainGameDataOrInsertNew({ discordId: member.id }, 'discordGuild')

  const event = { points: points - userPoints, reason }

  await updateGameData(gameData, event, true)

  if (sendMessage) {
    await member.send(
      `Администратор: <@${interaction.user.id}>` +
      ` установил вам **${points}** ${declineWord(points, 'очк', 'о', 'а', 'ов')}.` +
      ` Причина: "${reason}"`
    )
  }

  return interaction.editReply({
    // eslint-disable-next-line security/detect-object-injection
    content: messageLocales[localeString](member, points, reason)
  })
}