import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

import * as mongodb from '../../../services/mongidb'

interface User {
  [key: string]: unknown
  discord: {
    id: string
  },

  games: {
    gonnaBeLucky: {
      points: number
      events: GameEvent[]
    }
  }
}

interface GameEvent {
  event: string
  points: number
  increase: boolean
  declination: string
  date?: Date
}

export const data = new SlashCommandBuilder()
  .setName('rating')
  .setDescription('Выводит таблицу лидеров')

/**
 * Displays the leaderboard
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 */
export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply()
  
  const users = await findUsers<User>()

  if (users.length === 0) {
    await interaction.editReply('Таблица лидеров пуста')
    return
  }

  await interaction.editReply({
    content: 'Таблица лидеров',
    embeds: [{
      color: 1,
      fields: users.map((user: User, index: number) => ({
        name: `${index + 1}. ${interaction.guild?.members.cache.get(user.discord.id)?.displayName || 'Неизвестный пользователь'}`,
        value: `Очки: ${user.games?.gonnaBeLucky?.points || 0}`
      }))
    }]
  })
}

/**
 * Finds all users who have points
 * @returns {Promise<[]>} - Array of users
 */
async function findUsers<T>(): Promise<T[]> {
  return mongodb.user.find({ 'games.gonnaBeLucky.points': { $gt: 0 } })
    .sort({ 'games.gonnaBeLucky.points': -1 })
    .limit(10)
    .toArray() as Promise<T[]>;
}