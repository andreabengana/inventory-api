const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SEL_ALL = 'SELECT * FROM person';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'inventory'
});

connection.connect(err => {
    if(err){
        return err;
    }
});

console.log(connection);
app.use(cors());

app.get('/products', (req, res) => {
    connection.query(SEL_ALL, (err, results) => {
        if(err){
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.get('/', (req, res) => {
    res.send('hello from house')
});

app.listen(4000, () => {
    console.log(`bro`)
});