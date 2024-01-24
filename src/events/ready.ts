import { Client } from 'discord.js'

import cronAddDailyPointsToMembers from '../../utils/discord/cron-add-daily-points-to-members'
import cronUpdateTopRatedUsersRoles from '../../utils/discord/cron-update-top-rated-users-roles'
import refreshInteractionCommands   from '../../utils/discord/refresh-interaction-commands'
import syncGuildMembersWithDatabase from '../../utils/discord/sync-guild-members-with-database'

/**
 * Emitted when the client becomes ready to start working
 * @param {Client} client - Discord Client
 */
export default async function ready (client: Client) {
  const guild = client.guilds.cache.first()

  if (!guild)       throw new Error('No guild found')
  if (!client.user) throw new Error('Bot is not logged in')

  await Promise.all([
    syncGuildMembersWithDatabase(guild),
    refreshInteractionCommands(client.user),
    cronUpdateTopRatedUsersRoles(guild),
    cronAddDailyPointsToMembers(guild)
  ])
  
  console.log(`${client.user?.username} bot is ready!`)
}
