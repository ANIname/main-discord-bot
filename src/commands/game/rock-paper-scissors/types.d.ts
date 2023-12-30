import { ChatInputCommandInteraction, Snowflake } from 'discord.js'

import weapons from './weapons.json'

export type Weapon           = keyof typeof weapons
export type PlayerGameStatus = 'win'  | 'lose'  | 'draw'

export type playFunctionType = (interaction: ChatInputCommandInteraction, playersArray: Player[]) => void

export interface Player {
  id: Snowflake
  choice: 'rock' | 'paper' | 'scissors'
  status: PlayerGameStatus
}

export interface GameChannels {
  // Key is channel id
  // Value is array of players
  [key: Snowflake]: GameChannelOptions
}

export interface GameChannelOptions {
  timer: number,
  initiateMessageId: Snowflake,
  players: Player[]
}

export interface GamePlayHandlers {
  [key: number]: playFunctionType
}

export interface ChatInputCommandInteractionOptions {
  weapon: Weapon
  bet: number
  timer: number
}