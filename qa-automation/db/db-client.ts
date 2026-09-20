import mysql from 'mysql2/promise'
import { DB_CONFIG } from '../data/db-config'

export async function createDbConnection(): Promise<mysql.Connection> {
  return mysql.createConnection(DB_CONFIG)
}
