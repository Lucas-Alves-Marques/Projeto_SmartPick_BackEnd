import database from '../Repository/mysql.js';


// POST
async function createCategory(title, id_raffle) {

    const sql = "INSERT INTO category (title, id_raffle) VALUES (?, ?)";

    const conn = await database.connectDB();

    const [category] = await conn.query(sql, [title, id_raffle]);

    conn.end();

    return category.insertId;
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

export default { createCategory};
