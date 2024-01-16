import { ChatInputCommandInteraction, GuildMember, Message, TextChannel } from 'discord.js'

import { getUserPlayer } from '../player'
import { InteractionOptions } from '../types.d'
import useCollector from './collector'
import prepareEmbed, { addFieldIfBetSpecified, addFieldIfTimerSpecified, addFirstPlayer, removeEmptySpace } from './embed'
import getMenuComponent from './get-menu-component'
import { replyThatPlayerPlayerPointsNotEnough } from './reply'

/**
 * Initiates the game
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @param {InteractionOptions} interactionOptions - Interaction options
 * @returns {Promise<Message<boolean>>} - Interaction response
 */
export default async function initiateGame(
  interaction: ChatInputCommandInteraction,
  interactionOptions: InteractionOptions
): Promise<Message<boolean>> {
  const player  = await getUserPlayer(interaction, interactionOptions)
  const players = [player]

  if (interactionOptions.bet && player.points < interactionOptions.bet) {
    return replyThatPlayerPlayerPointsNotEnough(interaction, player)
  }

  const channel = interaction.channel as TextChannel
  const embed   = prepareEmbed(interaction.member as GuildMember)
  const menu    = getMenuComponent()

  if (interactionOptions.bet) addFieldIfBetSpecified(embed, interactionOptions.bet)
  if (interactionOptions.timer) addFieldIfTimerSpecified(embed, interactionOptions.timer / 60 / 1000)

  removeEmptySpace(embed)
  addFirstPlayer(embed, interaction.user.id)

  const [sentMessage] = await Promise.all([
    channel.send({ embeds: [embed], components: [menu] }),
    interaction.deleteReply()
  ])

  useCollector(sentMessage, menu, embed, players, interactionOptions)

  return sentMessage
}
