import { GuildMember, Role } from 'discord.js'
import Promise from 'bluebird'

export default async function updateRoleMember (currentRoleMember: GuildMember | undefined, newRoleMember: GuildMember | undefined, role: Role) {
  if (currentRoleMember?.id === newRoleMember?.id) return

  console.info(`Updating role member for role ${role.name}`)

  if (currentRoleMember) {
    const removeMemberFromRole = currentRoleMember.roles.remove(role)

    await Promise.resolve(removeMemberFromRole).timeout(5000)
  }

  if (newRoleMember) {
    const addMemberToRole = newRoleMember.roles.add(role)

    await Promise.resolve(addMemberToRole).timeout(5000)
  }

  await Promise.delay(35000)
}