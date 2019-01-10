const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());

let db;
massive('postgres://localhost:5432/brett.caudill')
  .then(dbConnection => {
    console.log('Connected to db');
    db = dbConnection;
  })
  .catch(err => console.log(err));

app.get('/api/movies', (req, res) => {
  db.get_all_movies().then(movies => {
    res.send(movies);
  })
  .catch(err => {
    res.status(500).send(err)
  })
})

app.post('/api/movies', (req, res) => {
  let { title, rating } = req.body
  db.create_movie([title, rating])
    .then(() => res.status(201).send('ok'))
    .catch(err => res.status(500).send(err))
})

app.put('/api/movies/:id', (req, res) => {
  let id = parseInt(req.params.id, 10);
  let { title, rating } = req.body
  db.update_movie([id, title, rating])
    .then(() => res.status(200).send('ok'))
    .catch(err => res.status(500).send(err))
})

app.delete('/api/movies/:id', (req, res) => {
  let id = parseInt(req.params.id, 10);
  db.delete_movie([id])
    .then(() => res.send('ok'))
    .catch(err => res.status(500).send(err))
})

app.listen(3000, () => console.log('listening on 3000'))
