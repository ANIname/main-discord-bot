import { Client } from 'discord.js'

/**
 * This function is only necessary for performing actions on the guild as a bot,
 * such as updating rules or sending messages or something else.
 * ...
 * @param {Client} client - Discord Client
 * @returns {Promise<void>}
 */
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function customHandler (client: Client) {
  // do something
}