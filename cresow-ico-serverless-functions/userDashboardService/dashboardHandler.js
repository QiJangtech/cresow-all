const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const crypto = require('crypto-price');
const fixer = require('fixer-api');
const app = express();
const mysql = require('mysql');

// API_KEY for fixer.io currency exchange API
var api_key = "240248c3035205cecd4ce7f1f9d43052";

// ----------- MYSQL Model -------------------

var connection = mysql.createConnection({
    host     : 'skus-storage.crnrqk57qmx5.ap-southeast-1.rds.amazonaws.com',
    user     : 'cresowadmin',
    password : 'cresow$admin',
    database : 'cresowdb'
});

connection.connect(function(err) {
    if (err) throw err;
});

// ----------- Functions -------------------

// ----------- Controller -------------------

app.use(bodyParser.json({ strict: false }));

// ----------- Endpoints -------------------

app.get('/crypto/:crypt', function (req, res) {
    crypto.getCryptoPrice("USD", req.params.crypt)
    .then(obj => {
        fixer.latest({ base: 'USD', symbols: ['MYR'], access_key: api_key })
        .then((success) => {
            obj.price = obj.price * success.rates.MYR;
            res.json({ message: '1 ' + req.params.crypt + ' = ' + 'RM' + obj.price });
        })
        .catch((error) => {
            res.json({ error: error });
        })
    })
    .catch(err => {
        res.json({ error: err });
    })
})

app.get('/dashboard/:id', function (req, res) {
    res.json({ message: req.params.id + " says hello to dashboard" });
})

app.get('/userDashboard/:userId', function (req, res) {
    var dashboardDetails = []

    var userDetails = {
        name: "",
        age: "",
        btc_deposit: "",
        coin_balance: ""
    }

    var authDetails = {
        total_users: "",
        total_cresow_sold: "",
        total_btc_raised: ""
    }
    

    if (req.params.userId == "1") {
        userDetails = {name: "Irasakumar", age: 25, btc_deposit: 250, coin_balance: 25678}
        res.json({ message: userDetails });
    } 
    else if (req.params.userId == "2") {
        userDetails = {name: "Adrian", age: 28, btc_deposit: 700, coin_balance: 25255}
        res.json({ message: userDetails });
    }
})

app.get('/countdown', function (req, res) {
    var countdown_timer = {
        days: 60,
        hours: 48,
        minutes: 12,
        seconds: 10
    }

    res.json({ countdown_timer });
})

app.get('/stageStructure', function (req, res) {
    var stages = [
        stage_1 = {
            date: new Date(),
            bonus_rate: "100",
            referral: "100"
        },
        stage_2 = {
            date: new Date(),
            bonus_rate: "80",
            referral: "80"
        },
        stage_3 = {
            date: new Date(),
            bonus_rate: "60",
            referral: "60"
        },
        stage_4 = {
            date: new Date(),
            bonus_rate: "40",
            referral: "40"
        },
        stage_5 = {
            date: new Date(),
            bonus_rate: "20",
            referral: "20"
        },
        stage_6 = {
            date: new Date(),
            bonus_rate: "10",
            referral: "10"
        }
    ]

    res.json({ stages });
})

// ----------- Export serverless -------------------

module.exports.handler = serverless(app);