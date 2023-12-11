import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import fetch from 'node-fetch'

const { BACKEND_URL } = process.env

interface User {
  _id: string
  discord: {
    id: string
  }
  games?: {
    gonnaBeLucky?: {
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
  
  const response = await fetch(`${BACKEND_URL}/users?sort={ "games.gonnaBeLucky.points": -1 }`)
  const users = await response.json() as User[]

  await interaction.editReply({
    embeds: [{
      title: 'Таблица лидеров',
      color: 0,
      fields: users.map((user: User, index: number) => ({
        name: `${index + 1}. ${interaction.guild?.members.cache.get(user.discord.id)?.displayName}`,
        value: `Очки: ${user.games?.gonnaBeLucky?.points}`,
        inline: true
      }))
    }]
  })
}
