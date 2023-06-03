const express = require('express');
const cors = require('cors');
const router = express.Router();
const { connectDB, closeDB, getDB } = require('./context/db');

const app = express();

app.use(cors());
app.use((req, res, next) => {
  console.log('Cabeceras de solicitud:', req.headers);
  next();
});

app.listen(3000, () => console.log("Iniciando servidor en el puerto 3000"));

app.get('/LOGIN', async (req, res) => {
  await connectDB();
  console.log('Query: ' + JSON.stringify(req.query));
  const { username, password } = req.query;
  const db = await getDB();
  const collection = db.collection('usuarios');
  const query = { username, password };
  const user = await collection.findOne(query);
  await closeDB();
  console.log(user);
  if (user) {
    res.send({ status: 'OK', message: 'Usuario encontrado' });
  } else {
    res.send({ status: 'ERROR', message: 'Usuario no encontrado' });
  }
});

module.exports = router;