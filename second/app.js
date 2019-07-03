const express = require('express')
const mysql = require('mysql')

const app = express()

app.use(express.json())
//Create connection
const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'CameronJ2006!',
  database: 'nodemysql',
  insecureAuth: true
})

// db.connect((err) => {
//   if (err) {
//     console.error('ahhhhhh', err.message)
//     // return;
//   }
//   console.log(`MySql Connected!`)
// })

app.get('/', (req, res) => res.send('dirty farm'))

app.get('/users', (req, res) => {
  console.log('AHHHHHH')
  pool.query('select * from amber', (err, result) => {
    if (err) {
      console.log('FATTTT', err.message)
      res.sendStatus(500)
    }
    res.json(result)
  })
})

//create DB
app.get('/users/:id', async (req, res) => {
  let sql = "select * from amber where id = ?"
  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, result) => {
    if (err) res.sendStatus(500)
    res.json(result)
  })
})

app.post('/users', (req, res) => {
  let sql = "insert into amber (name) values (?)"
  sql = mysql.format(sql, [req.body.name])

  pool.query(sql, (err, result) => {
    if (err) res.sendStatus(500)
    res.json({
      msg: 'success',
      newId: result.insertId
    })
  })
})

//CREATE TABLE
app.get('/createPostsTable', (req, res) => {
  let sql = `CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))`;

  // db.query(sql, (err, result) => {
  //   if (err) {
  //     console.error(err.message)
  //   }
  //   console.log(result)
  //   res.send(`Post table created...`)
  // })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on port 3000`))