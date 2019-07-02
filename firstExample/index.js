const express = require('express')
const mysql = require('mysql')

const app = express()

const db = mysql.createConnection({
  host: 'localhost',
  user: 'amber',
  password: '123456',
  database: 'acme'
})
db.connect()

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result)
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))