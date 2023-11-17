import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export type CommandName = string
export type CommandHandler = (interaction: ChatInputCommandInteraction) => Promise<void>

export interface Command {
  data: SlashCommandBuilder
  execute: CommandHandler
}

export interface Commands {
  [key: CommandName]: Command
}
