const {
  DISCORD_BOT_TOKEN,
  OPENAI_API_KEY,

  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE
} = process.env

module.exports = {
  apps: [{
    name: 'main-discord-bot',
    script: 'dist/src/index.js',
    env: {
      DISCORD_BOT_TOKEN,
      OPENAI_API_KEY,
      
      POSTGRES_HOST,
      POSTGRES_USER,
      POSTGRES_PASSWORD,
      POSTGRES_DATABASE
    }
  }]
}