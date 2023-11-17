import { directoryImport } from 'directory-import'

import { Command, Commands } from './types.d'

const commands: Commands = {}

// Import all commands from the commands directory and add them to the commands object
// Example: ./commands/test/ping.ts => commands['ping'] = { data: { ... }, execute: () => { ... } }
directoryImport((moduleName, _, moduleData) => {
  if (moduleName === 'index') return

  const { data, execute } = moduleData as Command

  commands[data.name] = { data, execute }
})

export default commands