const client = require('./connection.js')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(5000, ()=>{
    console.log("Sever is now listening at port 5000");
})

client.connect();

app.get('/users', (req, res) => {
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

// insert user data
app.post('/addUser', (req, res) => {
    const user = req.body;

    let insertQuery = `insert into users( name, email, photo, date) 
                       values('${user.name}', '${user.email}', '${user.photo}', '${user.date}')`;

    client.query(insertQuery, (err, result) => {
        if(!err) {
            res.send(true);
        } else {
            res.send(false);
        }
    })
    client.end;
})

// insert user post
app.post('/addPost', (req, res)=> {
    const post = req.body;

    let insertQuery = `insert into posts(author, "authorEmail", "authorPhoto", "postBody", date, likes, comments, shares) 
                       values('${post.author}', '${post.authorEmail}', '${post.authorPhoto}', '${post.postBody}', '${post.date}', ${post.likes}, ${post.comments}, ${post.shares})`;

    client.query(insertQuery, (err, result) => {
        if(!err) {
            res.send(true);
        } else {
            console.log(err);
            res.send(false);
        }
    })
    client.end;
})

// load all posts
app.get('/posts', (req, res) => {
    client.query(`select * from posts`, (err, result) => {
        if(!err) {
            res.send(result.rows);
        }
    })
})

