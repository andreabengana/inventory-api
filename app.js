const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

const SEL_ALL = 'SELECT * FROM items';

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

app.set('views',path.join(__dirname,'views'));
			
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log(connection);


app.use(cors());
app.get('/', (req, res) => {
    connection.query(SEL_ALL, (err, results) => {
        if(err){
            return res.send(err);
        } else {
            return res.render('items_index', {
                title : 'Items',
                item : results
            })
        }
    });
});

app.get('/items', (req, res) => {
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

app.get('/add',(req, res) => {
    res.render('items_add', {
        title : 'Add Item'
    });
});
 
app.post('/save',(req, res) => { 
    let data = {name: req.body.name, qty: req.body.qty, amount: req.body.amount};
    let sql = "INSERT INTO items SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.listen(4000, () => {
    console.log(`test`)
});