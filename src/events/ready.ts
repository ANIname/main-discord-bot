import { Client } from 'discord.js'

import cronAddDailyPointsToMembers from '../../utils/discord/cron-add-daily-points-to-members'
import cronUpdateTopRatedUsersRoles from '../../utils/discord/cron-update-top-rated-users-roles'
import customHandler from '../../utils/discord/custom-handler'
import refreshInteractionCommands   from '../../utils/discord/refresh-interaction-commands'
import refreshInfoChannelsTexts from '../../utils/discord/refresh-info-channels-texts'
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
    refreshInteractionCommands(client.user),
    refreshInfoChannelsTexts(guild),
    syncGuildMembersWithDatabase(guild),
    cronUpdateTopRatedUsersRoles(guild),
    cronAddDailyPointsToMembers(guild),
    customHandler(client)
  ])
  
  console.log(`${client.user?.username} bot is ready!`)
}
