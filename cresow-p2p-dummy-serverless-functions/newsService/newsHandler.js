const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql');
const querystring = require('querystring');
const http = require('http');
var request=require('request');
var crypto = require('crypto-price')
var cors = require('cors');

// const PAYMENT_TABLE = "q_payment";

// ----------- Model -------------------
var connection = mysql.createConnection({
    host: '13.229.207.163',
    user: 'classfiedDBA',
    password: 'T4Vu&7eVx3zP',
    database: 'classified'
});
connection.connect(function (err) {
    if (err) throw err;
});

// ----------- Controller ------------------
app.use(bodyParser.json({ strict: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(cors());
app.get('/crypto/:crypt', function (req, res) {
    crypto.getCryptoPrice("USD", req.params.crypt)
    .then(obj => {
    res.json({ message: obj.price });
    })
    .catch(err => {
    res.json({ error: err });
    })
})
// Get by walletId endpoint



app.get('/getNews', function (req, res) {
    
    
    
    console.log(req.query);
    var json=
    {   
         news:[
            {id:'1',title:'Title 1 lorem ipsum',details:"test",datetime:new Date()},
            {id:'1',title:'Title 2 lorem ipsum',details:"test",datetime:new Date()}
        ]
        
    }
    res.json(json);
})


// TODO create endpoint to get paginated wallets

// TODO create endpoint to update wallet

// TODO create endpoint to delete wallet

module.exports.handler = serverless(app);