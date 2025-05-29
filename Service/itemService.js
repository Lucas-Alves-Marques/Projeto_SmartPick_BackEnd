import database from '../Repository/mysql.js';

// POST

async function createItem(name, id_category) {

    const sql = "INSERT INTO items (name, id_category) VALUES (?, ?)";

    const conn = await database.connectDB();

    await conn.query(sql, [name, id_category]);

    conn.end();
}

// GET

async function listItems(id_category1, id_category2) {

    if (id_category2) {

        const SQL = "select * from items where id_category = ? or id_category = ?";

        const ids = [id_category1, id_category2]

        const conn = await database.connectDB();

        const [rows] = await conn.query(SQL, ids);

        conn.end();

        return rows;
    }

    else {

        const SQL = "select * from items where id_category = ? ";

        const conn = await database.connectDB();

        const [rows] = await conn.query(SQL, id_category1);

        conn.end();

        return rows;

    }



}

// PUT

async function updateItem(name, id) {

    const SQL = 'update items set name = ? where id_item = ?';

    const body = [name, id]

    const conn = await database.connectDB();

    await conn.query(SQL, body)

    conn.end
}

// DELETE

async function deleteItem(id) {

    const SQL = 'delete from items where id_item = ?';

    const conn = await database.connectDB();

    await conn.query(SQL, id)

    conn.end
}


export default { createItem, listItems, updateItem, deleteItem };
