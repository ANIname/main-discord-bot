export type GameTitle = 'gonnaBeLucky' | 'rockPaperScissors'
export interface MainGameData {
  id: string
  points: number
  title: GameTitle
}

export interface MainGameEvent {
  points: number
}
