import { ChatInputCommandInteraction, Message, StringSelectMenuInteraction } from 'discord.js'

import { Player } from '../types.d'
import weapons from '../weapons.json'
import { playerAlreadyInGame, playerPointsNotEnough } from './locales'

type SupportedLocale = 'uk' | 'ru' | 'en-US'

const availableLocales = new Set(['uk', 'ru', 'en-US'])

/**
 *
 * @param {StringSelectMenuInteraction} interaction - Interaction
 * @param {Player} player - Player
 * @returns {Promise<Message<boolean>>} - Interaction response
 */
export function replyThatPlayerAlreadyInGame (interaction: StringSelectMenuInteraction, player: Player): Promise<Message<boolean>> {
  const localeString = availableLocales.has(interaction.locale) ? interaction.locale as SupportedLocale : 'en-US'
  
  // eslint-disable-next-line security/detect-object-injection
  const playerChoice = weapons[player.weapon].name_localizations[localeString]

  // eslint-disable-next-line security/detect-object-injection
  const message = playerAlreadyInGame[localeString](playerChoice)

  return interaction.editReply({ content: message })
}

/**
 *
 * @param {StringSelectMenuInteraction} interaction - Interaction
 * @param {Player} player - Player
 * @returns {Promise<Message<boolean>>} - Interaction response
 */
export function replyThatPlayerPlayerPointsNotEnough (interaction: StringSelectMenuInteraction | ChatInputCommandInteraction, player: Player): Promise<Message<boolean>> {
  const localeString = availableLocales.has(interaction.locale) ? interaction.locale as SupportedLocale : 'en-US'

  // eslint-disable-next-line security/detect-object-injection
  const message = playerPointsNotEnough[localeString](player.points)

  return interaction.editReply({ content: message })
}