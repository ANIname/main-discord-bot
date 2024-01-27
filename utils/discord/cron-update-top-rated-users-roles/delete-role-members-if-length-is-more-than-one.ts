import { GuildMember, Role } from 'discord.js'
import Promise from 'bluebird'

export default async function deleteRoleMembersIfLengthIsMoreThanOne (currentRoleMembers: GuildMember[], role: Role) {
  if (currentRoleMembers.length <= 1) return

  console.info(`Deleting all members from role ${role.name}, because it has more than one member (${currentRoleMembers.length})`)

  for await (const roleMember of currentRoleMembers) {
    const removeMemberFromRole = roleMember.roles.remove(role)

    await Promise.resolve(removeMemberFromRole).timeout(5000)

    await Promise.delay(35000)
  }
}