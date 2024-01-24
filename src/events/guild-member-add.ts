import { Client, GuildMember, Snowflake } from 'discord.js'
import * as uuid from 'uuid'

import knex from '../../services/knex'

/**
 * GuildMemberAdd event
 * @param {Client} _ - Discord Client
 * @param {GuildMember} member - Discord GuildMember
 * @returns {Promise<void>} - Promise
 */
export default function guildMemberAdd(_: Client, member: GuildMember) {
  return Promise.all([
    insertGuildMemberToDatabase(member.user.id),
    attachRoleToUser(member)
  ])
}

/**
 * Emitted whenever a user joins a guild
 * @param {Snowflake} memberId - Discord GuildMember id
 * @returns {Promise<void>} - Promise
 */
async function insertGuildMemberToDatabase(memberId: Snowflake) {
  const isUserExists = await knex('User').where('discordId', memberId).select([]).first() as Record<string, unknown> | undefined

  return isUserExists
    ? undefined
    : knex('User').insert({ id: uuid.v4(), discordId: memberId })
}

/**
 * Attach base role to user
 * Role id is: 407889848192729089
 * @param {GuildMember} member - Discord GuildMember
 * @returns {Promise<void>} - Promise
 */
async function attachRoleToUser(member: GuildMember) {
  const role = await member.guild.roles.fetch('407889848192729089')

  if (!role) throw new Error('No role found')

  return member.roles.add(role)
}