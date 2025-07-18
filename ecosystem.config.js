const {
  DISCORD_BOT_TOKEN,
  DISCORD_BOT_OPEN_AI_API_KEY,

  SERVER_HOST,
  POSTGRESQL_USERNAME,
  POSTGRESQL_PORT,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_DATABASE,
  ANINAME_POSTGRES_URL
} = process.env

module.exports = {
  apps: [{
    name: 'main-discord-bot',
    script: 'dist/src/index.js',
    restart_delay: 1000 * 60 * 1, // Every 1 minutes
    env: {
      DISCORD_BOT_TOKEN,
      DISCORD_BOT_OPEN_AI_API_KEY,
      
      SERVER_HOST,
      POSTGRESQL_USERNAME,
      POSTGRESQL_PORT,
      POSTGRESQL_PASSWORD,
      POSTGRESQL_DATABASE,
      ANINAME_POSTGRES_URL
    }
  }]
}