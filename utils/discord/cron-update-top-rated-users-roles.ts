import chromaJs from 'chroma-js'
import { CronJob } from 'cron'
import declineWord from 'decline-word'
import { Guild, Snowflake } from 'discord.js'
import startsWith from 'lodash/startsWith'

import { getUsersRating } from '../../services/knex/base-queries/user'

// Run Every minute
export default async (guild: Guild) => new CronJob('0 * * * * *', async () => {
  const gradient = chromaJs.scale(['#86FF99', '#88C0FC', '#BE9EFF', 'FFB8E0']).domain([100, 60, 40, 1])

  const [usersRating, guildRoles] = await Promise.all([
    getUsersRating(100),
    guild.roles.fetch()
  ])

  const promises: unknown[] = []

  guildRoles.forEach((role) => {
    if (!startsWith(role.name, 'Top Rated User #')) return

    const roleNumber = Number((role.name.split(' ')[3] || '').replace('#', ''))
    const points = usersRating[roleNumber - 1]?.totalPoints || 0

    const currentRoleName = role.name
    const newRoleName = `Top Rated User #${roleNumber} (${points} ${declineWord(points, 'point', '' , 's', 's')})`

    // Set points to role name
    if (currentRoleName !== newRoleName) {
      promises.push(role.setName(newRoleName))
    }

    const currentRoleColor = role.color
    const newRoleColor = gradient(roleNumber).num()

    // Set color to role
    if (currentRoleColor !== newRoleColor) {
      promises.push(role.setColor(newRoleColor))
    }

    const currentRoleUser = role.members.first()
    const newRoleUser     = guild.members.cache.get(usersRating[roleNumber - 1]?.discordId as Snowflake)
    
    // Set user to role
    if (currentRoleUser?.id !== newRoleUser?.id) {
      promises.push(
        newRoleUser?.roles.add(role),
        currentRoleUser?.roles.remove(role)
      )
    }
  })

  await Promise.all(promises)
}).start()
