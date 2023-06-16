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
    res.send({ status: 'OK', message: user });
  } else {
    res.send({ status: 'ERROR', message: 'Usuario no encontrado' });
  }
});

app.post('/SAVE', async (req, res) => {
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
  const partida = await fetch('http://192.168.1.56:8080/' + game + '/point' + `?point=` + points,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  await closeDB();
  console.log(partida.status);
  if (partida.ok) {
    console.log('Partida guardada');
    const json = await partida.json();
    console.log(json);
    const { message, scores } = json;
    res.send({ status: 'OK', message: message, score: scores });
  }
  else if (partida.status === 304) {
    console.log('Partida no acabada');
    res.send({ status: 'WARNING', message: 'Partida no acabada' });
  }
  // switch (partida.status) {
  //   case 'OK':
  //     points = partida.scores;
  //     console.log('Partida guardada');
  //     break;
  //   case 'ERROR':
  //     console.log('Error al guardar la partida');
  //     break;
  //   case 'WARNING':
  //     console.log('Partida no acabada');
  //     break;
  //   default:
  //     console.log('Error desconocido');
  //     break;
  // }
});

module.exports = router;