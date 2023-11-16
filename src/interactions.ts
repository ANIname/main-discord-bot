import { REST, Routes } from 'discord.js'
import map from 'lodash/map'

import { BOT_ID } from '../constants/bot'
import { GUILD_ID } from '../constants/guild'
import commands from './commands'

const { DISCORD_BOT_TOKEN } = process.env

const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN as string)

;(async () => {
  try {
    console.log('Started refreshing application (/) commands.')

    await rest.put(
      Routes.applicationGuildCommands(BOT_ID, GUILD_ID),
      { body: map(commands, 'data') },
    )

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
})()