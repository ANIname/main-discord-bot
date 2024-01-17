import declineWord from 'decline-word'
import { EmbedBuilder, GuildMember, Snowflake } from 'discord.js'

import { InteractionOptions, Player } from '../types.d'

export default (member: GuildMember): EmbedBuilder => new EmbedBuilder()
  .setColor(member.displayHexColor)
  .setAuthor({ name: 'Камень, ножницы, бумага', iconURL: 'https://cdn.discordapp.com/attachments/413313254354583557/1195690644123955270/rock-paper-scissors-logo.png' })
  .setDescription('Ожидание соперника для игры в: "Камень, ножницы, бумага"')
  .setFooter({
    text: `Использовал(а) команду \`/камень-ножницы-бумага\``,
    iconURL: member.user.avatarURL() || undefined
  })

/**
 * Update embed to game finished
 * @param {EmbedBuilder} embed - Embed
 * @param {InteractionOptions} interactionOptions - Interaction options
 * @param {Player[]} playedPlayers - Played players with updated status
 * @returns {EmbedBuilder} - Embed with updated description
 */
export function updateEmbedToGameFinished (embed: EmbedBuilder, interactionOptions: InteractionOptions, playedPlayers: Player[]): EmbedBuilder {
  const isDraw = playedPlayers[0]?.status === 'draw'

  if (isDraw) return embed.setDescription(`Игра в: "Камень, ножницы, бумага" окончена ничьей`)

  embed.setDescription(`Игра в: "Камень, ножницы, бумага" окончена!`)

  const winners = playedPlayers.filter(player => player.status === 'win')
  const losers  = playedPlayers.filter(player => player.status === 'lose')

  let startIndexToSplice = 0

  if (interactionOptions.bet)   startIndexToSplice++
  if (interactionOptions.timer) startIndexToSplice++

  embed.spliceFields(startIndexToSplice, playedPlayers.length + 1)

  removeEmptySpace(embed)

  winners.forEach((winner, index) => (index === 0)
    ? embed.addFields({ name: winners.length > 1 ? 'Победители:' : 'Победивший игрок:', value: `<@${winner.discordId}>`, inline: true })
    : embed.addFields({ name: '\u200B', value: `<@${winner.discordId}>`, inline: true })
  )

  removeEmptySpace(embed)

  losers.forEach((loser, index) => (index === 0)
    ? embed.addFields({ name: losers.length > 1 ? 'Проигравшие:' : 'Проигравший игрок:', value: `<@${loser.discordId}>`, inline: true })
    : embed.addFields({ name: '\u200B', value: `<@${loser.discordId}>`, inline: true })
  )

  removeEmptySpace(embed)

  return embed
}

export const addFieldIfBetSpecified = (embed: EmbedBuilder, bet: number): EmbedBuilder => bet === 0
  ? embed
  : embed
    .addFields({
      name: 'Ставка:',
      value: `${bet} ${declineWord(bet, 'очк', 'о', 'а', 'ов')}`,
      inline: true
    })

export const addFieldIfTimerSpecified = (embed: EmbedBuilder, timerInMinutes: number): EmbedBuilder => timerInMinutes === 0
  ? embed
  : embed
    .setDescription('Ожидание соперников для игры в: "Камень, ножницы, бумага"')
    .addFields({
      name: 'Таймер:',
      value: `${timerInMinutes} ${declineWord(timerInMinutes, 'минут', 'а', 'ы')}`,
      inline: true
    })

export const addFirstPlayer = (embed: EmbedBuilder, discordId: Snowflake): EmbedBuilder => embed
  .addFields({ name: 'Игроки:', value: `<@${discordId}>`, inline: true })

export const addPlayer = (embed: EmbedBuilder, discordId: Snowflake): EmbedBuilder => embed
  .addFields({ name: '\u200B', value: `<@${discordId}>`, inline: true })

/**
 * Remove empty space from embed
 * @param {EmbedBuilder} embed - Embed
 * @returns {EmbedBuilder} - Embed without empty space
 */
export function removeEmptySpace(embed: EmbedBuilder): EmbedBuilder {
  const reminders = embed.data.fields?.length as number % 3

  if (reminders === 1) embed
    .addFields({ name: '\u200B', value: '\u200B', inline: true }, { name: '\u200B', value: '\u200B', inline: true })

  if (reminders === 2) embed
    .addFields({ name: '\u200B', value: '\u200B', inline: true })

  return embed
}