import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'

import { amountOption } from './options'

export const data = new SlashCommandBuilder()
  .setName('messages-bulk-delete')
  .setNameLocalizations({
    'uk': 'масове-видалення-повідомлень',
    'ru': 'массовое-удаление-сообщений'
  })
  .setDescription('Bulk delete messages')
  .setDescriptionLocalizations({
    'uk': 'Видаляє декілька повідомлень в чаті однією командою',
    'ru': 'Удаляет несколько сообщений в чате одной командой'
  })
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .setDMPermission(false)
  .addNumberOption(amountOption)