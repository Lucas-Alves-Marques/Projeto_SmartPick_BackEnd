import database from '../Repository/mysql.js';

async function listRaffleName() {

    const sql = "select * from raffle";

    const conn = await database.connectDB();

    const [rows] = await conn.query(sql);

    conn.end();

    return rows;

}

async function createRaffle(name) {

    const SQL = 'insert into raffle(name) values(?);'

    const conn = await database.connectDB()

    const [raffle] = await conn.query(SQL, [name])

    conn.end();

    return raffle.insertId;

}

async function getRaffle(id_raffle) {

    const sql = "select name from raffle where id_raffle = ?";

    const conn = await database.connectDB();

    const [rows] = await conn.query(sql, id_raffle);

    conn.end();

    return rows;
}

export default { listRaffleName, createRaffle, getRaffle }


