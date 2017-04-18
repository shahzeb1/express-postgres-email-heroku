"use strict";
const express = require('express')
const bodyParser = require('body-parser')
const pg = require('pg')

// Postgres specific:
const conString = process.env.DATABASE_URL
const client = new pg.Client(conString)

// Get our Express app ready:
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Add CORS
app.use(function (req, res, next) {
    // Website you wish to allow to connect:
    var allowedOrigins = ['http://localhost:3000', 'http://example.com', 'https://example.com'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/**
 * GET route /
 * @returns {string} Homepage.
 */
app.get('/', (req, res) => {
  res.status(200).send('Your email server is live!')
});

/**
 * POST route /add
 * @param {request} In the request body, "email" should be set
 * @return {json} Returns error JSON, or "added"
 */
app.post('/add', (req, res) => {
  "use strict";
  const wild = {"wild": "true"}
  const email = req.body.email
  client.connect()
  client.query("INSERT INTO emails(email) VALUES ($1)", [email], (err, item) => {
    if(err){
      res.json(err)
      return next(err)
    }else{
      res.status(200).json("added")
    }
  })
})

// Get the app up and running.
app.listen(process.env.PORT || 8000, function () {
  console.log('Example email adding application listening.')
})
