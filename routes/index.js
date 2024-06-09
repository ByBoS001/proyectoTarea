var express = require('express');
var router = express.Router();

const db = require('../db');

//middleware

router.use(bodyParser.json());


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//ruta get para obtener usuarios
router.get('/users', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta de la base de datos');
  }
});

// Ruta POST para agregar un nuevo usuario
router.post('/users', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send('Faltan parámetros requeridos');
  }

  try {
    const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).send(`Usuario agregado con ID: ${result.insertId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la inserción de datos en la base de datos');
  }
});

router.listen(port, () => {
  console.log(`Example router listening at http://localhost:${port}`);
});



module.exports = router;
