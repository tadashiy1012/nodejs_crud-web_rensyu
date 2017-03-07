var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  port: 3306,
  database: 'mydb'
});
conn.connect();

router.get('/', function(req, res) {
  res.render('dbindex', {});
});

router.get('/list', function(req, res) {
  conn.query('select * from member limit 100;', (err, rows) => {
    if (err) throw err;
    res.render('dblist', {items: rows});
  });
});

router.get('/create', function(req, res) {
  res.render('dbcreate', {});
});

router.post('/create', function(req, res) {
  const name = req.body.name;
  const q = 'insert into member (id, name) values (null, "' + name + '");';
  conn.query(q, (err, results) => {
    if (err) throw err;
    console.log(results.insertId);
    res.redirect('./list');
  });
});

module.exports = router;