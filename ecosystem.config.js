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
    restart_delay: 1000 * 60 * 1, // Every 1 minutes
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