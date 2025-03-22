import { Client } from 'discord.js'

import getAllIntents from '../utils/discord/get-all-intents'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

const { DISCORD_BOT_TOKEN } = process.env

export const client = new Client({ intents: getAllIntents() })

client.login(DISCORD_BOT_TOKEN)
