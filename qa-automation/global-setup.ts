import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise'
import { createDbConnection } from './db/db-client'
import { TEST_RECIPE_TITLE_PREFIX } from './tests/helpers/unique-data'

export default async function globalSetup(): Promise<void> {
  const connection = await createDbConnection()

  const [before] = await connection.execute<RowDataPacket[]>(
    'SELECT COUNT(*) AS count FROM recipes WHERE title LIKE ?',
    [`${TEST_RECIPE_TITLE_PREFIX}%`],
  )
  console.log(`[global-setup] тестових рецептів до очищення: ${before[0].count}`)

  const [result] = await connection.execute<ResultSetHeader>(
    'DELETE FROM recipes WHERE title LIKE ?',
    [`${TEST_RECIPE_TITLE_PREFIX}%`],
  )
  console.log(`[global-setup] прибрано тестових рецептів: ${result.affectedRows}`)

  const [after] = await connection.execute<RowDataPacket[]>(
    'SELECT COUNT(*) AS count FROM recipes WHERE title LIKE ?',
    [`${TEST_RECIPE_TITLE_PREFIX}%`],
  )
  console.log(`[global-setup] тестових рецептів після очищення: ${after[0].count}`)

  await connection.end()
}
