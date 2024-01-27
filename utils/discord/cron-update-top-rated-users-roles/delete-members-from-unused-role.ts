import { GuildMember, Role } from 'discord.js'
import Promise from 'bluebird'

import { UserRating } from '../../../services/knex/types.d'

export default async function deleteMembersFromUnusedRole (currentRoleMembers: GuildMember[], userRating: UserRating, role: Role) {
  if (userRating || currentRoleMembers.length === 0) return

  console.info(`Deleting members from unused role ${role.name}`)

  for await (const roleMember of currentRoleMembers) {
    const removeMemberFromRole = roleMember.roles.remove(role)

    await Promise.resolve(removeMemberFromRole).timeout(5000)

    await Promise.delay(35000)
  }
}