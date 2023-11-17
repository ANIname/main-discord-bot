import { directoryImport } from 'directory-import'

import { Command, Commands } from './types.d'

const commands: Commands = {}

directoryImport((moduleName, _, moduleData) => {
  if (moduleName === 'index') return

  const { data, execute } = moduleData as Command

  commands[data.name] = { data, execute }
})

export default commands