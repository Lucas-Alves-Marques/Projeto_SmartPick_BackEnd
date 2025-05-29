import database from '../Repository/mysql.js';

// POST

async function createCategory(title, id_raffle) {

    const sql = "INSERT INTO category (title, id_raffle) VALUES (?, ?)";

    const conn = await database.connectDB();

    const [category] = await conn.query(sql, [title, id_raffle]);

    conn.end();

    return category.insertId;
}

// GET

async function listCategory(id_raffle) {

    const SQL = "select title, id_category from category where id_raffle = ?;";

    const conn = await database.connectDB();

    const [rows] = await conn.query(SQL, id_raffle);

    conn.end();

    return rows;
}

// PUT

async function updateCategory(name, id) {
    
        const SQL = 'update category set title = ? where id_category = ?';
    
        const body = [name, id]
    
        const conn = await database.connectDB();
    
        await conn.query(SQL, body)
    
        conn.end
}

// DELETE

async function deleteCategory(id) {

        const SQL = 'delete from category where id_category = ?';
    
        const conn = await database.connectDB();
    
        await conn.query(SQL, id)
    
        conn.end
}

export default { createCategory, listCategory, updateCategory, deleteCategory};
