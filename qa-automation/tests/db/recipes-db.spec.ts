import { test, expect } from '@playwright/test';
import mysql from 'mysql2/promise';
import { DB_CONFIG } from '../../data/db-config';

let connection: mysql.Connection;

test.beforeAll(async () => {
  connection = await mysql.createConnection(DB_CONFIG);

  const [[owner]] = await connection.execute<mysql.RowDataPacket[]>(
    'SELECT id FROM users WHERE email = ?',
    ['goit@gmail.com'],
  );

  await connection.execute('DELETE FROM recipes WHERE title = ?', ['Борщ']);
  await connection.execute(
    `INSERT INTO recipes (title, category, owner_id, instructions, description, time)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      'Борщ',
      'Soup',
      owner.id,
      "Наріжте овочі. Обсмажте буряк і моркву. Варіть у бульйоні 40 хвилин.",
      "Класичний український суп на основі буряка з овочами та м'ясом.",
      '60 minutes',
    ],
  );
});

test.beforeEach(async () => {
  await connection.execute('DELETE FROM recipes WHERE title = ?', ['Тестовий рецепт']);
});

test('рецепт «Борщ» має категорію Soup', async () => {
  const [rows] = await connection.execute<mysql.RowDataPacket[]>(
    'SELECT category FROM recipes WHERE title = ?',
    ['Борщ'],
  );

  expect(rows[0].category).toBe('Soup');
});

test.afterAll(async () => {
  await connection.execute('DELETE FROM recipes WHERE title = ?', ['Борщ']);
  await connection.end();
});
