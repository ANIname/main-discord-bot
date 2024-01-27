import { Role } from 'discord.js'
import Promise from 'bluebird'

export default async function updateRoleColor (currentRoleColor: number, newRoleColor: number, role: Role) {
  if (currentRoleColor === newRoleColor) return

  console.info(`Updating role color for role ${role.name}`)

  await Promise.resolve(role.setColor(newRoleColor)).timeout(5000)

}