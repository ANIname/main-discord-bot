import { LocaleString } from 'discord.js'

import { Player } from '../types.d'
import weapons from '../weapons.json'

type SupportedLocale = 'uk' | 'ru' | 'en-US'
type AvailableLocalesNames = keyof typeof locales

const availableLocales = new Set(['uk', 'ru', 'en-US'])

const locales = {
  draw: {
    uk: (userPlayerChoice: string) => `🤝 Нічия! Ми обидва обрали: ${userPlayerChoice}`,
    ru: (userPlayerChoice: string) => `🤝 Ничья! Мы оба выбрали: ${userPlayerChoice}`,
    'en-US': (userPlayerChoice: string) => `🤝 Draw! We both chose: ${userPlayerChoice}`
  },
  win: {
    uk: (userPlayerChoice: string, botPlayerChoice: string) => `🎉 Ви виграли! Ваш вибір: ${userPlayerChoice}, мій вибір: ${botPlayerChoice}`,
    ru: (userPlayerChoice: string, botPlayerChoice: string) => `🎉 Вы выиграли! Ваш выбор: ${userPlayerChoice}, мой выбор: ${botPlayerChoice}`,
    'en-US': (userPlayerChoice: string, botPlayerChoice: string) => `🎉 You won! Your choice: ${userPlayerChoice}, my choice: ${botPlayerChoice}`
  },
  lose: {
    uk: (userPlayerChoice: string, botPlayerChoice: string) => `😭 Ви програли! Ваш вибір: ${userPlayerChoice}, мій вибір: ${botPlayerChoice}`,
    ru: (userPlayerChoice: string, botPlayerChoice: string) => `😭 Вы проиграли! Ваш выбор: ${userPlayerChoice}, мой выбор: ${botPlayerChoice}`,
    'en-US': (userPlayerChoice: string, botPlayerChoice: string) => `😭 You lost! Your choice: ${userPlayerChoice}, my choice: ${botPlayerChoice}`
  }
}

/**
 * Get player choice
 * @param {LocaleString} locale - Locale
 * @param {Player} player - Player
 * @returns {string} - Player choice localized
 */
export function getPlayerChoice(locale: LocaleString, player: Player): string {
  const localeString = availableLocales.has(locale) ? locale as SupportedLocale : 'en-US'

  // eslint-disable-next-line security/detect-object-injection
  return weapons[player.weapon].name_localizations[localeString]
}

/**
 * Get localized message
 * @param {LocaleString} locale - interaction locale (Example: 'en' | 'ru' | 'uk')
 * @param {AvailableLocalesNames} localeName - Locale name (Example: 'draw' | 'win' | 'lose')
 * @param {string} userPlayerChoice - Localized user player choice (Example: 'Камінь' | 'Камень' | 'Rock')
 * @param {string} botPlayerChoice - Localized bot player choice (Example: 'Ножиці' | 'Ножницы' | 'Scissors')
 * @returns {string} - Message localized
 */
export function getLocalisedMessage(locale: LocaleString, localeName: AvailableLocalesNames, userPlayerChoice: string, botPlayerChoice: string): string {
  const localeString = availableLocales.has(locale) ? locale as SupportedLocale : 'en-US'

  // eslint-disable-next-line security/detect-object-injection
  return locales[localeName][localeString](userPlayerChoice, botPlayerChoice)
}
