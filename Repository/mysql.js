import mysql from 'mysql2/promise';

async function connectDB() {
  if (!global.connection) {
    global.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'Smart_Pick'
    });
    console.log("✅ Conectado ao MySQL");
  }
  return global.connection;
}

export default { connectDB };
