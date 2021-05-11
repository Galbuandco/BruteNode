'use strict';
var readline = require('readline');
const fetch = require('node-fetch');
var fs = require('fs');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require("express");

if (cluster.isMaster) {
    var app = express();
    app.listen(5000);
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));
    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/index.html");
    })
    var completati = 0
    app.post("/dati", (req, res) => {
        console.log(req.body);
        var usernames = req.body.file_utenti;
        var passwords = req.body.file_passwd;
        console.log('Master process is running with pid:', process.pid);
        var lista_utenti = require('fs').readFileSync(usernames, 'utf-8')
            .split('\n')
            .filter(Boolean);
        var j = 0;
        for (let i = 0; i < 30; ++i) {
            cluster.fork({ utenti: lista_utenti.slice(j, j + 1), password_file: passwords });
            j = j + 1;
        }
        res.send(200);
    });
    cluster.on('exit', (worker, code, signal) => {
        //console.log(completati)
        completati++;
        if (completati > 29) {
            process.exit();
        }
    })
} else {
    var LineByLineReader = require('line-by-line'),
        lr = new LineByLineReader(process.env.password_file);

    lr.on('error', function (err) {
        // 'err' contains error object
    });

    lr.on('line', function (line) {
        var passwd = line;
        var utenti = process.env.utenti.split(',')
            .filter(Boolean);
        lr.pause();
        var i = 0
        //insert the request copied from chrome as explained in README
        ).then(result => result.json())
            .then((json) => {
                if (json.token != null) {
                    console.log(utenti[i], passwd, json.token);
                }
                lr.resume();
            })
    });

    lr.on('end', function () {
        process.exit();
    });
}