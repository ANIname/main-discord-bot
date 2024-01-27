import { Role } from 'discord.js'
import Promise from 'bluebird'

export default async function updateRoleName (currentRoleName: string, newRoleName: string, role: Role) {
  if (currentRoleName === newRoleName) return

  console.info(`Updating role name for role ${role.name}`)

  await Promise.resolve(role.setName(newRoleName)).timeout(5000)

  await Promise.delay(35000)
}