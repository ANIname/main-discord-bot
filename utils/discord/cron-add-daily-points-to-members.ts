import { CronJob } from 'cron'
import { Guild } from 'discord.js'

import { updateGameData } from '../../services/knex/base-queries/game-data'
import { getUserMainGameDataOrInsertNew } from '../../services/knex/base-queries/user'

// Run Every day at 00:00
export default async (guild: Guild) => new CronJob('0 0 0 * * *', async () => {
  const guildMembers = await guild.members.fetch()

  guildMembers.forEach(async (member) => {
    const gameData = await getUserMainGameDataOrInsertNew({ discordId: member.id }, 'discordGuild')

    const event = {
      points: 1,
      reason: 'Ежедневное бонусное очко'
    }

    await updateGameData(gameData, event)
  })
}).start()