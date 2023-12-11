import { MongoClient, ServerApiVersion } from 'mongodb'

const { MONGODB_URI = '' } = process.env

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

export default client

export const user = client.db('aniname-database').collection('user')