import { CacheType, ChatInputCommandInteraction, ContextMenuCommandInteraction, Snowflake } from 'discord.js'

export type InputInteraction = ChatInputCommandInteraction<CacheType> | ContextMenuCommandInteraction<CacheType>

export type CommandName    = string
export type UserDiscordId  = Snowflake
export type CommandHandler = (interaction: InputInteraction) => Promise<void>

export interface Command {
  commandName: CommandName
  commandTimeout?: number
  execute: CommandHandler
}

export interface Commands {
  [key: CommandName]: Command
}

export interface CommandLastExecutionTimes {
  [key: UserDiscordId]: Date
}

export interface CommandsLastExecutionTimes {
  [key: CommandName]: CommandLastExecutionTimes
}