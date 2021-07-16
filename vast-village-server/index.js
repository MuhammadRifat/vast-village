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

app.post('/users', (req, res) => {

    const findQuery = `select * from users where email not in 
    (((select distinct("friendOneEmail") from friends where "friendTwoEmail"='${req.body.email}') 
    UNION 
    (select distinct("friendTwoEmail") from friends where "friendOneEmail"='${req.body.email}'))
    UNION 
    ((select distinct("fromEmail") from "friendRequests" where "toEmail"='${req.body.email}') 
    UNION 
    (select distinct("toEmail") from "friendRequests" where "fromEmail"='${req.body.email}'))) AND email!='${req.body.email}'`;
    
    client.query(findQuery, (err, result)=>{
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err);
        }
    });
    client.end; 
})

app.post('/friends', (req, res) => {
    const findQuery = `select * from users where email IN ((select distinct("friendOneEmail") from friends where "friendTwoEmail"='${req.body.email}') UNION (select distinct("friendTwoEmail") from friends where "friendOneEmail"='${req.body.email}'));`;
    client.query(findQuery, (err, result)=>{
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err);
        }
    });
    client.end; 
})

app.post('/user', (req, res) => {
    client.query(`Select * from users where email='${req.body.email}'`, (err, result)=>{
        if(!err){
            res.send(result.rows[0]);
        }
    });
    client.end;
})

app.post('/getUserPosts', (req, res) => {
    const findQuery = `SELECT * FROM posts where "authorEmail"='${req.body.email}' order by date desc`;
    client.query(findQuery, (err, result)=>{
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
app.post('/posts', (req, res) => {
    const findQuery = `select * from posts where "authorEmail" IN ((select distinct("friendOneEmail") from friends where "friendTwoEmail"='${req.body.email}') UNION (select distinct("friendTwoEmail") from friends where "friendOneEmail"='${req.body.email}')) order by date desc;`;
    client.query(findQuery, (err, result) => {
        if(!err) {
            res.send(result.rows);
        } else {
            console.log(err);
        }
    })
})

app.post('/addFriend', (req, res) => {
    const insertQuery = `insert into "friendRequests" ("fromEmail", "toEmail", date) 
                        values ('${req.body.fromEmail}', '${req.body.toEmail}', '${req.body.date}')`;
    client.query(insertQuery, (err, result) => {
        if(!err) {
            res.send(result.rowCount > 0);
        } else {
            console.log(err);
        }
    })
})

app.post('/confirmFriend', (req, res) => {
    const insertQuery = `insert into friends("friendOneEmail", "friendTwoEmail", date) 
                        values ('${req.body.toEmail}', '${req.body.fromEmail}', '${req.body.date}')`;
    
    const deleteQuery = `delete from "friendRequests" where "fromEmail"='${req.body.fromEmail}' AND "toEmail"='${req.body.toEmail}'`;
    client.query(insertQuery, (err, result) => {
        if(!err) {
            if(result.rowCount > 0){
                client.query(deleteQuery, (err, result) => {
                    res.send(result.rowCount > 0);
                })
            }  else {
                  console.log(err);  
            }
        } else {
            console.log(err);
        }
    })
})

app.delete('/deleteRequest', (req, res) => {
    const deleteQuery = `delete from "friendRequests" where "fromEmail"='${req.body.fromEmail}' AND "toEmail"='${req.body.toEmail}'`;
    client.query(deleteQuery, (err, result) => {
        if(!err) {
            res.send(result.rowCount > 0);
        } else {
            console.log(err);
        }
    })
})

app.post('/friendRequests', (req, res) => {
    const findQuery = `select * from users where email IN (select "fromEmail" from "friendRequests" where "toEmail"='${req.body.email}') order by date desc`;
    client.query(findQuery, (err, result) => {
        if(!err) {
            res.send(result.rows);
        } else {
            console.log(err);
        }
    })

})

app.delete('/deleteFriend', (req, res) => {
    const deleteQuery = `delete from friends where "friendOneEmail"='${req.body.emailOne}' AND "friendTwoEmail"='${req.body.emailTwo}' OR "friendOneEmail"='${req.body.emailTwo}' AND "friendTwoEmail"='${req.body.emailOne}'`;
    client.query(deleteQuery, (err, result) => {
        if(!err) {
            res.send(result.rowCount > 0);
        } else {
            console.log(err);
        }
    })
})

