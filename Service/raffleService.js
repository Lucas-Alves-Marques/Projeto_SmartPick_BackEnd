import database from '../Repository/mysql.js';

//GET

async function listRaffleName() {

    const sql = "select * from raffle";

    const conn = await database.connectDB();

    const [rows] = await conn.query(sql);

    conn.end();

    return rows;

}

// POST

async function createRaffle(name) {

    const SQL = 'insert into raffle(name) values(?);'

    const conn = await database.connectDB()

    const [raffle] = await conn.query(SQL, [name])

    conn.end();

    return raffle.insertId;

}

// GET RAFFLE

async function getRaffle(id_raffle) {

    const sql = "select name from raffle where id_raffle = ?";

    const conn = await database.connectDB();

    const [rows] = await conn.query(sql, id_raffle);

    conn.end();

    return rows;
}

// PUT RAFFLE

async function updateNameRaffle(name, id) {
    
    const SQL = 'update raffle set name = ? where id_raffle = ?';

    const body = [name, id]

    const conn = await database.connectDB();

    await conn.query(SQL, body)

    conn.end
}

// DELETE

async function deleteRaffle(id) {

        const SQL = 'delete from raffle where id_raffle = ?';
    
        const conn = await database.connectDB();
    
        await conn.query(SQL, id)
    
        conn.end
}

export default { listRaffleName, createRaffle, getRaffle, updateNameRaffle, deleteRaffle }


