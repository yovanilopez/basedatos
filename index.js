const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const dbconf= require('./configurations/db');



var app = express();
app.use(bodyParser.json());


var mysqlConnection = mysql.createConnection({
   host: dbconf.host,
    user: dbconf.user,
    password: dbconf.password,
    database: dbconf.database,

   
    
});

app.get("/persona", (req, res) => {
    console.log("get lista persona");
    mysqlConnection.query('Select * from persona', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});
app.get("/persona/:id", (req, res) => {
    console.log("get persona");
    mysqlConnection.query('Select * from persona where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});
app.post("/persona", (req, res) => {
    console.log("crear persona ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into persona (nombre, apellido, fecha_nacimiento,Direccion) values (?,?,?,?)',
        [est.nombre, est.apellido, est.fecha_nacimiento, est.Direccion], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("created");
            } else { 
                console.log(err);
                res.send('error' + err);
            }
        });
});

app.put("/persona/:id", (req, res) => {
    console.log("update estudiante ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update estudiante set nombre = ?, apellido = ?, edad = ?, grado=? where id = ?',
        [est.Nombre, est.Apellido, est.Edad, est.Grado, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

app.delete("/persona/:id", (req, res) => {
    console.log("update estudiante ");
    mysqlConnection.query('delete from estudiante where id = ?',
        [ req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("deleted");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});


// es para  postman
//app.listen(3000);

app.listen(process.env.PORT|| 3000);