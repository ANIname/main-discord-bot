import { directoryImport } from 'directory-import'

import { Command, Commands } from './types.d'

const commands: Commands = {}

// Import all commands from the commands directory and add them to the commands object
// Example: ./commands/game/gonna-be-lucky.ts => commands['gonna-be-lucky'] = { commandName: 'gonna-be-lucky', execute: (...) => { ... } }
directoryImport((_, __, moduleData) => {
  const { commandName, execute } = moduleData as Command

  if (commandName && execute) commands[commandName] = execute
})

export default commands