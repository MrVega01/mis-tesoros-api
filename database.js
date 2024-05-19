import { createClient } from '@libsql/client'
import { DATABASE_CREDENTIALS } from './src/utils/constants.js'

const createConnection = () => {
  const client = createClient(DATABASE_CREDENTIALS)
  return client
}

export {
  createConnection
}
