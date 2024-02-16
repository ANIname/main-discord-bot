import { directoryImport } from 'directory-import'

import { Command, Commands, CommandsLastExecutionTimes } from './types.d'

export const commands: Commands = {}

export const commandsLastExecutionTimes: CommandsLastExecutionTimes = {}

// Import all commands from the commands directory and add them to the commands object
// Example: ./commands/game/gonna-be-lucky.ts => commands['gonna-be-lucky'] = { commandName: 'gonna-be-lucky', execute: (...) => { ... } }
directoryImport((_, __, moduleData) => {
  const { commandName, execute } = moduleData as { [key: string]: unknown }

  if (typeof commandName === 'string' && typeof execute === 'function') {
    commands[commandName] = moduleData as Command

    commandsLastExecutionTimes[commandName] = {}
  }
})

export default commands