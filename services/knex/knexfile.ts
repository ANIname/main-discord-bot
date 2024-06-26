const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } = process.env

const knexConfig = {
  client: 'pg',
  connection: {
    host: POSTGRES_HOST,
    port: 5432,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
    ssl: true
  },
  pool: { min: 1, max: 10 },
}

export default knexConfig;
