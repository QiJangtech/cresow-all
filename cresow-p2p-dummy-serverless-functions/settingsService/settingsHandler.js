const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql');
const querystring = require('querystring');
const http = require('http');
var request=require('request');

var cors = require('cors');

// const PAYMENT_TABLE = "q_payment";


// ----------- Controller ------------------
app.use(bodyParser.json({ strict: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(cors());

// Get by walletId endpoint



app.get('/getSettings', function (req, res) {
    
    
    
    console.log(req.query);
    var json=
    {   
       account_status:"UNVERIFIED",
       user_code:"ABC123",
       user_email:"john.doe@gmail.com",
       username:"user123"  
        
    }
    res.json(json);
})


// TODO create endpoint to get paginated wallets

// TODO create endpoint to update wallet

// TODO create endpoint to delete wallet

module.exports.handler = serverless(app);