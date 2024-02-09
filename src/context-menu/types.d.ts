import { ContextMenuCommandInteraction, ContextMenuCommandBuilder } from 'discord.js'


export type ContextMenuItemName = string
export type ContextMenuItemHandler = (interaction: ContextMenuCommandInteraction) => Promise<void>

export interface ContextMenuItem {
  data: ContextMenuCommandBuilder
  execute: ContextMenuItemHandler
}

export interface ContextMenu {
  [key: ContextMenuItemName]: ContextMenuItem
}

export interface commandTimeOut {
  [key: string]: Date
}