import mysql from 'mysql2/promise';

async function connectDB() {

  global.connection = await mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_pick'

  });

  return global.connection;

}

export default { connectDB };
