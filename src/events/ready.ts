import { Client } from 'discord.js'

import cronAddDailyPointsToMembers  from '../../utils/discord/cron-add-daily-points-to-members'
import customHandler                from '../../utils/discord/custom-handler'
import refreshInfoChannelsTexts     from '../../utils/discord/refresh-info-channels-texts'
import syncGuildMembersWithDatabase from '../../utils/discord/sync-guild-members-with-database'

/**
 * Emitted when the client becomes ready to start working
 * @param {Client} client - Discord Client
 */
export default async function ready (client: Client) {
  console.time('🚀 Preparing bot to start working')

  const guild = client.guilds.cache.first()

  if (!guild)       throw new Error('No guild found')
  if (!client.user) throw new Error('Bot is not logged in')
  
  console.timeLog('🚀 Preparing bot to start working', `Logged in as ${client.user?.tag}!`)

  await Promise.all([
    refreshInfoChannelsTexts(guild),
    syncGuildMembersWithDatabase(guild),
    cronAddDailyPointsToMembers(guild),
    customHandler(client)
  ])

  console.timeLog('🚀 Preparing bot to start working', `${client.user?.username} bot is ready!`)

  console.timeEnd('🚀 Preparing bot to start working')
}
