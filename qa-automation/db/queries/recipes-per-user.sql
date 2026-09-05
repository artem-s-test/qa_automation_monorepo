-- db/queries/recipes-per-user.sql
SELECT u.email, COUNT(r.id) AS recipes_count
FROM users u
INNER JOIN recipes r ON r.owner_id = u.id
GROUP BY u.id, u.email
ORDER BY recipes_count DESC;
