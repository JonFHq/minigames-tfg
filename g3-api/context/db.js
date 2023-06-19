const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://admin:admin@tfg.3er0d9l.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log('Conexión exitosa a MongoDB Atlas');

  } catch (error) {
    console.error('Error al conectar a MongoDB Atlas', error);
  }

}

async function closeDB() {
  try {
    await client.close();
    console.log('Desconexión exitosa de MongoDB Atlas');

  } catch (error) {
    console.error('Error al desconectar de MongoDB Atlas', error);
  }

}

async function getDB() {
  try {
    const db = client.db('TFG');
    return db;

  } catch (error) {
    console.error('Error al obtener la base de datos', error);
  }

}


module.exports = {
    connectDB, 
    closeDB, 
    getDB
  };
  