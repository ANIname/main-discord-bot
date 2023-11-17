import { directoryImport } from 'directory-import'
import { ClientEvents } from 'discord.js'
import camelCase from 'lodash/camelCase.js'

import { client } from '../client'
import { Event, EventData } from './types.d'

// Import all events from the events directory and add them to the client
// Example: ./events/ready.ts => client.on('ready', () => { ... })
// Example: ./events/message-create.ts => client.on('messageCreate', () => { ... })
directoryImport((moduleName, _, moduleData) => {
  const eventName = camelCase(moduleName) as keyof ClientEvents
  const listener = (moduleData as EventData).default as Event

  if (typeof listener !== 'function') return

  client.on(eventName, (...arguments_) => listener(client, ...arguments_))
})
