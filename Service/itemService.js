import database from '../Repository/mysql.js';


// POST
async function createItem(name, id_category) {

    const sql = "INSERT INTO items (name, id_category) VALUES (?, ?)";

    const conn = await database.connectDB();

    await conn.query(sql, [name, id_category]);

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

export default {createItem};
