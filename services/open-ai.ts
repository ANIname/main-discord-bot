import OpenAI from 'openai';

const { OPENAI_API_KEY } = process.env

export default new OpenAI({ apiKey: OPENAI_API_KEY })