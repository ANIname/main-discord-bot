import { directoryImport } from 'directory-import'

import { ContextMenu, ContextMenuItem } from './types.d'

const contextMenu: ContextMenu = {}

// Import all context menu items from the context-menu directory and add them to the contextMenuItems object
// Example: ./context-menu/test/ping.ts => contextMenuItems['ping'] = { data: { ... }, execute: () => { ... } }
directoryImport((_, __, moduleData) => {
  const { data, execute } = moduleData as ContextMenuItem

  if (!data || !execute) return

  contextMenu[data.name] = { data, execute }
})

export default contextMenu