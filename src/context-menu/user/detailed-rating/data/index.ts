import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js'

export const data = new ContextMenuCommandBuilder()
  .setName('Detailed User Rating')
  .setType(ApplicationCommandType.User)
  .setDMPermission(false)
  .setNameLocalizations({
    'uk': 'Детальний рейтинг користувача',
    'ru': 'Детальный рейтинг пользователя'
  })
