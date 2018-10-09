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

// Get by walletId endpoint



app.get('/getTransactionInfo', function (req, res) {
    
    // var user=req.params.user;
    
    // console.log(req.query);
    var json=
    {   
       
        buying_history:[
            {id:'1',buy_amount:"1.99000",datetime:new Date()},
            {id:'2',buy_amount:"1.49000",datetime:new Date()}
        ],
        selling_history:[
            {id:'1',deposit_amount:"1.39000",datetime:new Date()},
            {id:'2',deposit_amount:"1.39000",datetime:new Date()}
        ]
        
    }
    res.json(json);
})


// TODO create endpoint to get paginated wallets

// TODO create endpoint to update wallet

// TODO create endpoint to delete wallet

module.exports.handler = serverless(app);