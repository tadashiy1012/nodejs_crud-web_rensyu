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
  res.render('dbindex', {title: 'dbindex'});
});

router.get('/list', function(req, res) {
  conn.query('select * from member limit 100;', (err, rows) => {
    if (err) throw err;
    res.render('dblist', {title: 'dblist', items: rows});
  });
});

router.get('/create', function(req, res) {
  res.render('dbcreate', {title: 'dbcreate'});
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

router.get('/delete', (req, res) => {
  res.render('dbdelete', {title: 'dbdelete'});
});

function execQuery(query) {
  return new Promise((resolve, reject) => {
    conn.query(query, (err, result) => {
      if (err) { reject(err); }
      else { resolve(result); }
    });
  });
}

router.post('/delete', (req, res) => {
  const id = req.body.name;
  const q = 'select * from member where id = ' + id + ';';
  const q2 = 'delete from member where id = ' + id + ';';
  execQuery(q).then((result) => {
    console.log(result);
    res.redirect('./list');
  }, (err) => {
    console.error(err);
    throw err;
  });
});

module.exports = router;