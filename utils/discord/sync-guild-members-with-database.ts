import { Guild } from 'discord.js'
import includes  from 'lodash/includes'
import map       from 'lodash/map'
import * as uuid from 'uuid'

import knex from '../../services/knex'

/**
 * Sync guild members with database
 * @param {Guild} guild - Discord Guild
 * @returns {Promise<void>}
 */
export default async function syncGuildMembersWithDatabase (guild: Guild) {
  const guildMembers    = await guild.members.fetch()
  const guildMembersIds = guildMembers.map(({ id }) => id)

  const users            = await knex('User').select('discordId').whereIn('discordId', guildMembersIds)
  const usersIds         = map(users, 'discordId')
  const usersIdsToCreate = guildMembersIds.filter(id => !includes(usersIds, id))

  const usersToCreate = map(usersIdsToCreate, (discordId) => {
    const id   = uuid.v4()
    const user = guildMembers.get(discordId)

    return { id, discordId, createdAt: user?.joinedAt }
  })

  return usersToCreate.length > 0
    ? knex('User').insert(usersToCreate)
    : Promise.resolve()
}