import { Snowflake } from 'discord.js'

export type Weapon = 'rock' | 'paper' | 'scissors'
export type GameStatus = 'win' | 'lose' | 'draw' | 'pending'

export interface GameOptions {
  timer: number,
  bet: number
}

export interface InteractionOptions {
  weapon: Weapon
  timer: number
  bet: number
}

export interface Player {
  id: string // UUID
  discordId: Snowflake // Snowflake
  weapon: Weapon
  status: GameStatus
  points: number
}
