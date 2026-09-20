import { test, expect } from '@playwright/test';
import mysql from 'mysql2/promise';

const DB_CONFIG = {
  host: 'localhost',
  port: 3307,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let connection: mysql.Connection;

test.beforeAll(async () => {
  connection = await mysql.createConnection(DB_CONFIG);
  await connection.execute('DELETE FROM recipes WHERE title LIKE ?',
    ['Test recipe%']
  );
});

test.afterAll(async () => {

await connection.end();

})
test('рецепт «Борщ» існує в базі даних', async () => {
  const [rows] = await connection.execute(
    'SELECT * FROM recipes WHERE title = ?',
    ['Boxty Breakfast']
  );
  expect(rows[0].category).toBe('Pork')
});