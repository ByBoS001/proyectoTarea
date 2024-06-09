var conection = require('../db');

var Usuario = `CREATE TABLE IF NOT EXISTS Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50),
    Last_name VARCHAR(50),
    Address VARCHAR(70),
    cellphone VARCHAR(13)
  )`;
  
  conection.query(Usuario, function (err, result) {
    if (err) throw err;
    console.log("Usuario table created");
  });
  
var Banco = `CREATE TABLE IF NOT EXISTS Banco (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(15),
  Address VARCHAR(30),
  usuario_id int,
  FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE
)`;

conection.query(Banco, function (err, result) {
  if (err) throw err;
  console.log("Banco table created");
});



conection.end(function(err) {
  if (err) throw err;
  console.log("Connection closed");
});