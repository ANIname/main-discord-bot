import { directoryImport } from 'directory-import'
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export type CommandName = string

export interface Command {
  data: SlashCommandBuilder
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}

export interface Commands {
  [key: CommandName]: Command
}

const commands: Commands = {}

directoryImport((moduleName, _, moduleData) => {
  if (moduleName === 'index') return

  const { data, execute } = moduleData as Command

  commands[data.name] = { data, execute }
})

export default commands