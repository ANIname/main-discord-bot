import { directoryImport } from 'directory-import'
import { Client, ClientEvents, GatewayIntentBits } from 'discord.js'
import camelCase from 'lodash/camelCase'

import { EventData } from './types.d'

const { DISCORD_BOT_TOKEN } = process.env

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

client.login(DISCORD_BOT_TOKEN)

// Import all events from the events directory and add them to the client
// Example: ./events/ready.ts => client.on('ready', () => { ... })
// Example: ./events/message-create.ts => client.on('messageCreate', () => { ... })
directoryImport('./events', (moduleName, _, moduleData) => {
  const eventName = camelCase(moduleName) as keyof ClientEvents
  const listener = (moduleData as EventData).default

  if (typeof listener !== 'function') return

  client.on(eventName, (...arguments_) => listener(client, ...arguments_))
})
