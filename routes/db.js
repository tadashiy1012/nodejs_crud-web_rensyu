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

router.get('/', function(req, res) {
  res.render('dbindex', {});
});

router.get('/list', function(req, res) {
  conn.connect();
  conn.query('select * from member limit 100;', (err, rows) => {
    if (err) throw err;
    res.render('dblist', {items: rows});
  });
  conn.end();
});

module.exports = router;