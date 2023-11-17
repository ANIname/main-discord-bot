export type Event = (...arguments_: unknown[]) => void

export interface EventData {
  default: Event
}