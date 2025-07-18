import { execSync } from 'node:child_process'

const { SERVER_HOST, POSTGRESQL_PORT, POSTGRESQL_USERNAME, POSTGRESQL_PASSWORD, POSTGRESQL_DATABASE } = process.env

const knexConfig = {
  client: 'pg',

  connection: {
    ssl: getPostgreSQL_SSLConfig(),

    host: SERVER_HOST,
    port: Number(POSTGRESQL_PORT),

    user: POSTGRESQL_USERNAME,
    password: POSTGRESQL_PASSWORD,
    database: POSTGRESQL_DATABASE,
  },

  pool: { min: 1, max: 10 },
}

function getPostgreSQL_SSLConfig() {
  console.time('⚙️  Get PostgreSQL SSL config')

  const command = 'openssl s_client'
    + ' -showcerts'
    + ` -connect ${SERVER_HOST}:${POSTGRESQL_PORT}`
    + ' -starttls postgres'
    + ' < /dev/null 2>/dev/null'
    + ' | sed -ne \'/^-----BEGIN CERTIFICATE-----\$/,/^-----END CERTIFICATE-----\$/p\''

  const caBuffer = execSync(command)

  console.timeEnd('⚙️  Get PostgreSQL SSL config')

  return { ca: caBuffer, rejectUnauthorized: false }
}

export default knexConfig;
