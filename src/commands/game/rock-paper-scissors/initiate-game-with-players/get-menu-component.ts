import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js'

import weapons from '../weapons.json'

/**
 * Returns menu component
 * @returns {ActionRowBuilder<StringSelectMenuBuilder>} - Menu component
 */
export default function getMenuComponent (): ActionRowBuilder<StringSelectMenuBuilder> {
  const options = Object.values(weapons).map(weapon => ({
    label: weapon.name_localizations.ru,
    value: weapon.value
  }))

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('weapon')
    .setPlaceholder('Выберите оружие для игры')
    .addOptions(...options)

  return new ActionRowBuilder<StringSelectMenuBuilder>({ components: [selectMenu] })
}