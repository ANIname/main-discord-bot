import { ChatInputCommandInteraction, InteractionResponse, Message, SlashCommandBuilder } from 'discord.js'

import { updateGameData } from '../../../../services/knex/base-queries/game-data'
import { getUserMainGameDataOrInsertNew } from '../../../../services/knex/base-queries/user'
import generateEvent from './generate-event'
import replyThatNeedToWait from './reply-that-need-to-wait'
import replyWithEvent from './reply-with-event'
import { GameTimeOut } from './types.d'

const timeOut = 1000 * 60 * 60 // 1 hour

const gameTimeOut: GameTimeOut = {}

export const data = new SlashCommandBuilder()
  .setName('gonna-be-lucky')
  .setNameLocalizations({
    'uk': 'мені-пощастить',
    'ru': 'мне-повезёт'
  })
  .setDescription('Generates a random event and gives or takes away points')
  .setDescriptionLocalizations({
    'uk': 'Генерує випадкову подію та дає або забирає очки',
    'ru': 'Генерирует случайное событие и даёт или отнимает очки'
  })

/**
 * Generates a random event and gives or takes away points
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 * @returns {Promise<InteractionResponse<boolean> | Message<boolean>>} - Promise
 */
export async function execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean> | Message<boolean>> {
  const userDiscordId = interaction.user.id

  // eslint-disable-next-line security/detect-object-injection
  const timeOutEnd = gameTimeOut[userDiscordId] as Date | undefined
  const needToWait = timeOutEnd && Date.now() - timeOutEnd.getTime() < timeOut

  if (needToWait) return replyThatNeedToWait(interaction, timeOut, timeOutEnd)

  const [game, event] = await Promise.all([
    getUserMainGameDataOrInsertNew({ discordId: userDiscordId }, 'gonnaBeLucky'),
    generateEvent(`<@${userDiscordId}>`),
    interaction.deferReply()
  ])

  const [, interactionResponse] = await Promise.all([
    updateGameData(game, event),
    replyWithEvent(interaction, event)
  ])

  // eslint-disable-next-line security/detect-object-injection
  gameTimeOut[userDiscordId] = new Date()

  return interactionResponse
}
