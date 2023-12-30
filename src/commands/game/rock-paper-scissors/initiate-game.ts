import { ChatInputCommandInteraction, TextChannel } from 'discord.js'

import gameChannels from './channels'
import { Player } from './types.d'

/**
 * Initiate game
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {Player} player - Current player
 * @param {number} timer - Timer in minutes that reloads after each player join
 * @returns {Promise<void>} - Promise
 */
export default async function initiateGame(interaction: ChatInputCommandInteraction, player: Player, timer: number): Promise<void> {
  if (!(interaction.channel instanceof TextChannel)) {
    interaction.editReply({ content: 'Вы пытаетесь инициировать игру, но игра доступна только в текстовых каналах!' })

    return
  }

  const message = `<@${player.id}> начал игру в камень-ножницы-бумага!` +
    '\n' +
    'Вступайте в игру командой `/rock-paper-scissors`!'

  const sentMessage = await interaction.channel.send(message)

  gameChannels[interaction.channel.id] = {
    timer,
    initiateMessageId: sentMessage.id,
    joinedMessagesIds: [],
    players: [player],
  }

  interaction.deleteReply()
}