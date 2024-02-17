import type { GameName } from '.prisma/client'

import prisma from '../'

import type { GameEvent } from './types.d'

export const saveGameEvent = (userId: string, gameName: GameName, event: GameEvent) => prisma.game.upsert({
  where: { userId_title: { userId, title: gameName } },

  update: {
    [gameName]: {
      update: {
        points: { increment: event.points },
        events: { create: event }
      }
    }
  },

  create: {
    userId,
    title: gameName,

    [gameName]: {
      create: {
        points: event.points,
        events: { create: event }
      }
    }
  }
})