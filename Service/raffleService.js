import database from '../Repository/mysql.js';

async function listRaffle(id_raffle) {

    const sql = "SELECT raffle.name AS raffle, category.title AS category, items.name AS item FROM items INNER JOIN category ON category.id_category = items.id_category INNER JOIN raffle ON raffle.id_raffle = category.id_raffle";

    const conn = await database.connectDB();

    const [rows] = await conn.query(sql, [id_raffle]);

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

export default{listRaffle,createRaffle}

