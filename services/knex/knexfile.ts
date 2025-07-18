const { SERVER_HOST, POSTGRESQL_PORT, POSTGRESQL_USERNAME, POSTGRESQL_PASSWORD, POSTGRESQL_DATABASE } = process.env

const knexConfig = {
  client: 'pg',
  connection: {
    host: SERVER_HOST,
    port: Number(POSTGRESQL_PORT),
    user: POSTGRESQL_USERNAME,
    password: POSTGRESQL_PASSWORD,
    database: POSTGRESQL_DATABASE,
    ssl: true
  },
  pool: { min: 1, max: 10 },
}

export default knexConfig;
