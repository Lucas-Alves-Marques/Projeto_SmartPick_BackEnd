import database from '../Repository/mysql.js';

async function listRaffle() {

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

export default{listRaffle,createRaffle}

