const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

const SEL_ALL_USR = 'SELECT * FROM users';
const SEL_ALL_PRODUCTS = 'SELECT * FROM products';


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'R@mpUp2019^',
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

// console.log(connection);


app.use(cors());


app.get('/users', (req, res) => {
    connection.query(SEL_ALL_USR, (err, results) => {
        if(err){
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.post('/login', (req, res) => {
    let data = {user_number: req.body.user_number};
    let sql = "SELECT * FROM users WHERE ?";
    connection.query(sql, data,(err, results) => {
        if(err){
            return res.send(err);
        } else {
            return res.json({
                data: results,
                foo: req.body.user_number
            })
        }
    });
});

app.post('/addusers', (req, res) => {
    let data = {
        user_firstname: req.body.firstName, 
        user_lastname: req.body.lastName, 
        user_number: req.body.number,
        user_password: req.body.password,
        user_type: req.body.usertype
    };
    let sql = "INSERT INTO users SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});


app.get('/products', (req, res) => {
    connection.query(SEL_ALL_PRODUCTS, (err, results) => {
        if(err){
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});


 
app.post('/saveusers',(req, res) => { 
    let data = {name: req.body.name, qty: req.body.qty, amount: req.body.amount};
    let sql = "INSERT INTO users SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.post('/saveproducts',(req, res) => { 
    let data = {name: req.body.name, qty: req.body.qty, amount: req.body.amount};
    let sql = "INSERT INTO products SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});



// app.post('/update',(req, res) => {
//     const userId = req.body.id;
//     let sql = "update users SET name='"+req.body.name+"',  qty='"+req.body.qty+"',  amount='"+req.body.amount+"' where id ="+userId;
//     let query = connection.query(sql,(err, results) => {
//       if(err) throw err;
//       res.redirect('/');
//     });
// });

// app.put('/update',(req, res) => {
//     const userId = req.body.id;
//     let sql = "update users SET name='"+req.body.name+"',  qty='"+req.body.qty+"',  amount='"+req.body.amount+"' where id ="+userId;
//     let query = connection.query(sql,(err, results) => {
//       if(err) throw err;
//       res.redirect('/');
//     });
// });

// app.get('/delete/:itemId',(req, res) => {
//     const userId = req.params.itemId;
//     let sql = `DELETE from users where id = ${itemId}`;
//     let query = connection.query(sql,(err, result) => {
//         if(err) throw err;
//         res.redirect('/');
//     });
// });

app.listen(4000, () => {
    console.log(`test`);
    console.log(connection)
});