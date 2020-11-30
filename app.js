const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

const SEL_ALL = 'SELECT * FROM posts';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
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

app.get('/posts', (req, res) => {
    connection.query(SEL_ALL, (err, results) => {
        if(err){
            return res.send(err);
        } else {
            console.log("act");
            return res.json(results);
        }
    });
});

 
app.post('/save',(req, res) => { 
    let data = {title: req.body.title};
    let sql = "INSERT INTO posts SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});


app.put('/update',(req, res) => {
    const postId = req.body.id;
    let sql = "update posts SET title='"+req.body.title+"' where id ="+postId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});


app.delete('/posts/delete/:postId',(req, res) => {
    const pstId = req.params.postId;
    let sql = `DELETE from posts where id = ${pstId}`;
    
    let query = connection.query(sql,(err, result) => {
        /*if(err) throw err;
        res.redirect('/');*/
        if(err){
            return res.send(err);
        } else {
            console.log("act");
            return res.json({
                data: result
            })
        }
    });
});

app.listen(4000, () => {
    console.log(`test`)
});