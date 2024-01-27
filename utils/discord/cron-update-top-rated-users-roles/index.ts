import { CronJob } from 'cron'
import declineWord from 'decline-word'
import { Guild, Snowflake } from 'discord.js'
import startsWith from 'lodash/startsWith'
import Promise from 'bluebird'

import deleteMembersFromUnusedRole from './delete-members-from-unused-role'
import deleteRoleMembersIfLengthIsMoreThanOne from './delete-role-members-if-length-is-more-than-one'
import updateRoleMember from './update-role-member'
import updateRoleName from './update-role-name'
import { getUsersRating } from '../../../services/knex/base-queries/user'
import { UserRating } from '../../../services/knex/types.d'

let isLoopRunning = false
let tryings = 0

// Run Every second
export default async (guild: Guild) => new CronJob('* * * * * *', async () => {
  if (isLoopRunning) {
    tryings++

    // Log every minute
    return (tryings % 60 === 0)
      ? console.warn(`Previous CronJob is still running (${tryings} seconds)`)
      : undefined
  }

  isLoopRunning = true

  const [usersRating, guildRoles] = await Promise.all([
    getUsersRating(100),
    guild.roles.fetch()
  ])

  const roles = guildRoles.map((role) => role)

  for await (const role of roles) {
    if (!startsWith(role.name, 'Top Rated User #')) continue

    const roleNumber  = Number((role.name.split(' ')[3] || '').replace('#', ''))
    const userRating  = usersRating[roleNumber - 1] as UserRating
    const totalPoints = userRating?.totalPoints || 0

    const newRoleName   = `Top Rated User #${roleNumber} (${totalPoints} ${declineWord(totalPoints, 'point', '' , 's', 's')})`
    const newRoleMember = (userRating) ? guild.members.cache.get(userRating.discordId as Snowflake) : undefined

    const currentRoleName    = role.name
    const currentRoleMember  = role.members.first()
    const currentRoleMembers = role.members.map((member) => member)

    try {
      await deleteMembersFromUnusedRole(currentRoleMembers, userRating, role)
      await deleteRoleMembersIfLengthIsMoreThanOne(currentRoleMembers, role)
      await updateRoleMember(currentRoleMember, newRoleMember, role)
      await updateRoleName(currentRoleName, newRoleName, role)
    } catch (error) {
      isLoopRunning = false
      tryings = 0

      throw error
    }
  }

  isLoopRunning = false
  tryings = 0
}).start()
