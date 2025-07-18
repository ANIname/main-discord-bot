import OpenAI from 'openai';

const { DISCORD_BOT_OPEN_AI_API_KEY } = process.env

export const openAi = new OpenAI({ apiKey: DISCORD_BOT_OPEN_AI_API_KEY })

export default openAi
