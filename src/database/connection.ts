import knex from 'knex'
import configurations from '../knexfile'

const connection = knex(configurations.development)

export default connection


