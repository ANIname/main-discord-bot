import { SlashCommandBuilder } from '@discordjs/builders'
import { PermissionFlagsBits } from 'discord.js'

import { addPointsSubcommand, removePointsSubcommand, setPointsSubcommand } from './subcommands'

export const data = new SlashCommandBuilder()
  .setName('points')
  .setDMPermission(false)
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .setNameLocalizations({ 'uk': 'очки', 'ru': 'очки' })
  .setDescription('Points management')
  .setDescriptionLocalizations({
    'uk': 'Керування очками учасників серверу',
    'ru': 'Управление очками участников сервера'
  })
  .addSubcommand(addPointsSubcommand)
  .addSubcommand(removePointsSubcommand)
  .addSubcommand(setPointsSubcommand)