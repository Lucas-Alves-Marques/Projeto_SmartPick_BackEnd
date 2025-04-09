import database from '../Repository/mysql.js';

// GET
async function listCategoriesByRaffle(id_raffle) {
    const sql = "SELECT * FROM category WHERE id_raflle = ?";
    const conn = await database.connectDB();
    const [rows] = await conn.query(sql, [id_raffle]);
    conn.end();
    return rows;
}

// POST
async function createCategory(title, id_raffle) {
    const sql = "INSERT INTO category (title, id_raflle) VALUES (?, ?)";
    const conn = await database.connectDB();
    await conn.query(sql, [title, id_raffle]);
    conn.end();
}

// PUT
async function updateCategory(id_category, title, id_raffle) {
    const sql = "UPDATE category SET title = ?, id_raflle = ? WHERE id_category = ?";
    const conn = await database.connectDB();
    await conn.query(sql, [title, id_raffle, id_category]);
    conn.end();
}

// DELETE
async function deleteCategory(id_category) {
    const sql = "DELETE FROM category WHERE id_category = ?";
    const conn = await database.connectDB();
    await conn.query(sql, [id_category]);
    conn.end();
}

export default { listCategoriesByRaffle, createCategory, updateCategory, deleteCategory };
