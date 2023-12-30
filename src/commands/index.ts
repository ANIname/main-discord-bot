import { directoryImport } from 'directory-import'

import { Command, Commands } from './types.d'

const commands: Commands = {}

// Import all commands from the commands directory and add them to the commands object
// Example: ./commands/test/ping.ts => commands['ping'] = { data: { ... }, execute: () => { ... } }
directoryImport((_, __, moduleData) => {
  const { data, execute } = moduleData as Command

  if (!data || !execute) return

  commands[data.name] = { data, execute }
})

export default commands