import database from '../Repository/mysql.js';

// GET
async function listItemsByCategory(id_category) {
    const sql = "SELECT * FROM items WHERE id_category = ?";
    const conn = await database.connectDB();
    const [rows] = await conn.query(sql, [id_category]);
    conn.end();
    return rows;
}

// POST
async function createItem(id_category, name) {
    const sql = "INSERT INTO items (id_category, name) VALUES (?, ?)";
    const conn = await database.connectDB();
    await conn.query(sql, [id_category, name]);
    conn.end();
}

// PUT
async function updateItem(id_item, id_category, name) {
    const sql = "UPDATE items SET id_category = ?, name = ? WHERE id_item = ?";
    const conn = await database.connectDB();
    await conn.query(sql, [id_category, name, id_item]);
    conn.end();
}

// DELETE
async function deleteItem(id_item) {
    const sql = "DELETE FROM items WHERE id_item = ?";
    const conn = await database.connectDB();
    await conn.query(sql, [id_item]);
    conn.end();
}

export default { listItemsByCategory, createItem, updateItem, deleteItem };
