import { configDotenv } from 'dotenv'
configDotenv()

export const DATABASE_CREDENTIALS = {
  url: process.env.DB_URL,
  authToken: process.env.DB_AUTH_TOKEN
}
