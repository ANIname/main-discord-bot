import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export type CommandName = string

export interface Command {
  data: SlashCommandBuilder
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}

export interface Commands {
  [key: CommandName]: Command
}
