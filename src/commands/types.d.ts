import { CacheType, ChatInputCommandInteraction, ContextMenuCommandInteraction } from 'discord.js'

export type InputInteraction = ChatInputCommandInteraction<CacheType> | ContextMenuCommandInteraction<CacheType>

export type CommandName    = string
export type CommandHandler = (interaction: InputInteraction) => Promise<void>

export interface Command {
  commandName: CommandName
  execute: CommandHandler
}

export interface Commands {
  [key: CommandName]: CommandHandler
}
