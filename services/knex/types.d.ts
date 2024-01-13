import { availableGames } from './enum'

export type GameTitle = typeof availableGames[number]
export interface MainGameData {
  id: string
  points: number
  title: GameTitle
}

export interface MainGameEvent {
  points: number
}
