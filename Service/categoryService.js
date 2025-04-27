import database from '../Repository/mysql.js';

// POST

async function createCategory(title, id_raffle) {

    const sql = "INSERT INTO category (title, id_raffle) VALUES (?, ?)";

    const conn = await database.connectDB();

    const [category] = await conn.query(sql, [title, id_raffle]);

    conn.end();

    return category.insertId;
}


export default { createCategory};
