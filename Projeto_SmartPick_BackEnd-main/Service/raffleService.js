import database from '../Repository/mysql.js';

async function listRaffle(id_raffle) {

    const sql = "SELECT * FROM raffle WHERE id_raffle = ?";

    const conn = await database.connectDB();

    const [rows] = await conn.query(sql, [id_raffle]);

    conn.end();

    return rows;

}

export default{listRaffle}

