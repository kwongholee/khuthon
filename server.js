require('dotenv').config();
const express = require('express');
const axios = require('axios')
const path = require('path')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const session = require("express-session");
const app = express();
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb');

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors())

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user ,done)=>{
  done(null, user.id)
})
passport.deserializeUser((id, done)=> {
  db.collection('user').findOne({id:id}, (err, result)=>{
      done(null,result)
  })
}); 

var db
MongoClient.connect(process.env.DB,{useUnifiedTopology: true}, function(err, client){
    if (err) return console.log(err)
    db = client.db('khuthon')
    app.listen(process.env.PORT, function(){
        console.log('listening on 8080')
    })
})

app.get('/login', passport.authenticate('google', {scope:['profile']}))

app.get('/login/redirect', passport.authenticate('google'), async (req, res) => {
  try {
    db.collection('user').findOne({id:req.user.id}, (err, result)=>{
      if (err) throw err
      res.send({isLogined: "Logined", userid: req.user.id, usertype : result.usertype})
    })
  } catch (err) {
    console.log(err)
    res.status(401)
  }
});

function Logined(req,res, next){
  if (req.user){
    res.send({isLogined: "Logined", userid: req.user.id})
    next()
  }
  else{
    res.send({isLogined: "Not Logined", userid: null, image : null})
  }
}

function register(data){
  db.collection('user').insertOne({
    id : data.id,
    name : "",
    level : null,
    language : null,
    genre : [],
    levelBook: [],
    genreBook : [],
    book : [],
    usertype : "newuser"
  })
}

passport.use(
  new GoogleStrategy(
     {
        clientID: process.env.OAUTH_ID, 
        clientSecret: process.env.OAUTH_PW,
        callbackURL: '/login/redirect'
     },
     async (accessToken, refreshToken, profile, done)=>{
        db.collection('user').findOne({id:profile.id}, (err, result)=>{
          if (err) throw err
          if (result == null){
            register(profile)
            done(null, profile)
          }
          else{
            db.collection('user').updateOne({id:profile.id},{$set: {usertype : 'user'}})
            done(null, profile)
          }
        })
     }
  )
)

app.use(express.static(path.join(__dirname, 'front/build')));

app.get('*', Logined, (req, res)=>{
  res.sendFile(path.join(__dirname, '/front/build/index.html'));
});    