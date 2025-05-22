import database from '../Repository/mysql.js';

// POST

async function createItem(name, id_category) {

    const sql = "INSERT INTO items (name, id_category) VALUES (?, ?)";

    const conn = await database.connectDB();

    await conn.query(sql, [name, id_category]);

    conn.end();
}

async function listItems(id_category1, id_category2) {

    if (id_category2) {

        const SQL = "select id_category, name from items where id_category = ? or id_category = ?";

        const ids = [id_category1, id_category2]

        const conn = await database.connectDB();

        const [rows] = await conn.query(SQL, ids);

        conn.end();

        return rows;
    }

    else {

        const SQL = "select id_category, name from items where id_category = ? ";

        const conn = await database.connectDB();

        const [rows] = await conn.query(SQL, id_category1);

        conn.end();

        return rows;

    }



}


export default { createItem, listItems };
