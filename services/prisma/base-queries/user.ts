import type { Snowflake } from 'discord.js'

import prisma from '../'

export const upsertUser = (discordId: Snowflake) => prisma.user.upsert({
  where: { discordId },
  create: { discordId },
  update: {},
  select: { id: true }
}).then(user => user?.id)
