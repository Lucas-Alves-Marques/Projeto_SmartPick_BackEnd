import database from '../Repository/mysql.js';

// POST

async function createItem(name, id_category) {

    const sql = "INSERT INTO items (name, id_category) VALUES (?, ?)";

    const conn = await database.connectDB();

    await conn.query(sql, [name, id_category]);

    conn.end();
}


export default {createItem};
