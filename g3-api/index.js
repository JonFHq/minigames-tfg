const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const { connectDB, closeDB, getDB } = require('./context/db');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  console.log('Cabeceras de solicitud:', req.headers);
  next();
});

app.listen(3000, () => console.log("Iniciando servidor en el puerto 3000"));

app.get('/UPDATEACC/:oldName', async (req, res) => {
  try {
  await connectDB();
  console.log('Query: ' + JSON.stringify(req.query));
  const { username, image, password } = req.query;
  const { oldName } = req.params;
  const db = await getDB();
  const collection = db.collection('usuarios');
  const query = { username: oldName };
  const update = { $set: { username, image, password } };
  await collection.updateOne(query, update, { upsert: true });
  const newUser = collection.findOne({username: username, password: password, image: image});
  console.log('Usuario actualizado');
  if (newUser == null) {
    res.send({ status: 'ERROR', message: 'Usuario no actualizado' });
  }
  res.send({ status: 'OK', message: newUser });
  } finally {
    await closeDB();
  }
});

app.get('/LOGIN', async (req, res) => {
  try {
    await connectDB();
    console.log('Query: ' + JSON.stringify(req.query));
    const { username, password } = req.query;
    const db = await getDB();
    const collection = db.collection('usuarios');
    const query = { username, password };
    const user = await collection.findOne(query);
    console.log('Usuario: ' + user);
    if (user != null) {
      console.log('Usuario encontrado');
      res.send({ status: 'OK', message: user });
    } else {
      console.log('Usuario no encontrado');
      res.send({ status: 'ERROR', message: 'Usuario no encontrado' });
    }
  } finally {
    await closeDB();
  }
});

app.get('/REGISTER', async (req, res) => {
  try {
    await connectDB();
    console.log('Query: ' + JSON.stringify(req.query));
    const { username, password } = req.query;
    const image = '';
    const db = await getDB();
    const collection = db.collection('usuarios');
    const document = { username, password, image };
    const result = await collection.insertOne(document, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });
    console.log(result);
    res.send({ status: 'OK', message: 'Usuario registrado' });
  } finally {
    await closeDB();
  }
});

app.post('/SAVE', async (req, res) => {
  try {
    await connectDB();
    console.log('Body: ' + JSON.stringify(req.body));
    const { game, user } = req.body;
    const db = await getDB();
    const collectionName = game + 'Clasificacion';
    const collection = db.collection(collectionName);
    const name = JSON.parse(user).username;
    const query = { user: name };
    const punctuation = await collection.findOne(query);
    let points = 0;
    if (punctuation) {
      console.log('Usuario encontrado');
      points = punctuation.puntuacionActual;
    } else {
      console.log('Usuario no encontrado');
    }
    const partida = await fetch('http://192.168.1.49:8080/' + game + '/point' + `?point=` + points,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    console.log(partida.status);
    if (partida.ok) {
      console.log('Partida acabada');
      const json = await partida.json();
      console.log(json);
      const { message, scores } = json;
      const puntuacion = scores;
      let update = {};
      // Actualizar puntuacion si ya tiene o crearla si no
      if (punctuation) {
        console.log('Actualizando puntuacion');
        // Si la puntuacionActual es mayor que la record se actualiza
        if (punctuation.record < puntuacion) {
          console.log('Actualizando record');
          update = { $set: { puntuacionActual: puntuacion, record: puntuacion } };
        } else {
        // Si la puntuacionActual es menor que la record no se actualiza
          console.log('No se actualiza record');
          update = { $set: { puntuacionActual: puntuacion } };
        }
        await collection.updateOne(query, update, { upsert: true });
      } else {
        console.log('Creando puntuacion');
        update = { puntuacionActual: puntuacion, record: puntuacion, user: name };
        await collection.insertOne(update, function (err, res) {
          if (err) throw err;
          console.log("1 document inserted");
        });
      }
      console.log('Partida guardada');
      res.send({ status: 'OK', message: message, score: scores });
    }
    else if (partida.status === 304) {
      console.log('Partida no acabada');
      res.send({ status: 'WARNING', message: 'Partida no acabada' });
    }
    else {
      console.log('Partida no guardada');
      res.send({ status: 'ERROR', message: 'Partida no guardada' });
    }
  } finally {
    await closeDB();
  }
});

app.get('/:Collection', async (req, res) => {
  try {
    await connectDB();
    console.log('Query: ' + JSON.stringify(req.query));
    const { Collection } = req.params;
    const db = await getDB();
    const collection = db.collection(Collection);
    const query = req.query;
    const result = await collection.findOne(query);
    console.log(result);
    if (result == null) {
      res.send({ status: 'OK', message: result });
    } else {
      res.send({ status: 'ERROR', message: 'Usuario ya registrado' });
    }
  } finally {
    await closeDB();
  }
});

module.exports = router;