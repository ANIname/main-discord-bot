import { Client, Snowflake } from 'discord.js'

import { commands, commandsLastExecutionTimes }        from '../commands'
import { CommandLastExecutionTimes, InputInteraction } from '../commands/types.d'

/**
 * Emitted when an interaction is created
 * @param {Client} _ - Discord Client
 * @param {InputInteraction} interaction - Discord Interaction
 * @returns {Promise<void>} - Promise
 */
export default async function interactionCreate(_: Client, interaction: InputInteraction): Promise<void> {
  const command                   = commands[interaction.commandName]
  const commandLastExecutionTimes = commandsLastExecutionTimes[interaction.commandName]
  
  if (!command) return

  // If command has a timeout and the user has executed the command before
  // then check if the user needs to wait
  if (command.commandTimeout && commandLastExecutionTimes) {
    const commandUserLastExecutionTime = commandLastExecutionTimes[interaction.user.id]

    if (commandUserLastExecutionTime) {
      const isCommandOnCooldown      = Date.now() - commandUserLastExecutionTime.getTime() < command.commandTimeout
      const remainingCooldownMinutes = Math.floor((command.commandTimeout - (Date.now() - commandUserLastExecutionTime.getTime())) / 1000 / 60)

      if (isCommandOnCooldown) return replyThatNeedToWait(interaction, remainingCooldownMinutes)

      else setCommandLastExecutionTime(commandLastExecutionTimes, interaction.user.id)
    }

    else setCommandLastExecutionTime(commandLastExecutionTimes, interaction.user.id)
  }

  // If all checks passed then execute the command
  await command.execute(interaction)
}

/**
 * Reply to the user indicating that they need to wait.
 * @param {InputInteraction} interaction - Discord Interaction
 * @param {number} waitTime - The amount of time the user needs to wait in minutes.
 * @returns {Promise<void>} - Promise
 */
async function replyThatNeedToWait (interaction: InputInteraction, waitTime: number): Promise<void> {
  const message = `Пожалуйста, наберитесь терпения! Подождите еще ${waitTime} мин. И я снова буду готова выполнить эту команду для вас!`

  await interaction.reply({ content: message, ephemeral: true })
}

/**
 * Set the last execution time for a command.
 * @param {CommandLastExecutionTimes} commandLastExecutionTimes - The object storing the last execution times for commands.
 * @param {Snowflake} userDiscordId - The Discord ID of the user.
 * @returns {void}
 */
function setCommandLastExecutionTime (commandLastExecutionTimes: CommandLastExecutionTimes, userDiscordId: Snowflake) {
  commandLastExecutionTimes[userDiscordId] = new Date()
}