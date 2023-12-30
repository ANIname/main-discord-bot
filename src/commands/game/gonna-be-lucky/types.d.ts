export interface GameEvent {
  data: string
  points: number
  declination: string
  date?: Date
}

export interface GameTimeOut {
  [key: string]: Date
}