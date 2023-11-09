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

app.get('/main',(req, res)=>{
  db.collection('user').findOne({id:req.user.id}, (err,result)=>{
    res.send(result)
  })
})

app.get('/login', passport.authenticate('google', {scope:['profile']}))

app.get('/login/redirect', passport.authenticate('google'), async (req, res) => {
  try {
    db.collection('user').findOne({id:req.user.id}, (err, result)=>{
      if (err) throw err
      if (result.usertype=="newuser"){
        res.redirect(`/register/profile/${req.user.id}`)
      }
      else{
        res.redirect('/main')
      }
    })
  } catch (err) {
    console.log(err)
    res.status(400)
  }
});

app.get('/authorization',(req,res)=>{
  if (req.user){
    res.send({isLogined: "Logined", userid: req.user.id})
  }
  else{
    res.send({isLogined: "Not Logined", userid: null, image : null})
  }
})

app.post('/register/profile/:userid',(req, res)=>{
  if (req.body.name==null){
    if (req.body.age == null){
      if (req.body.lang== null){
        res.status(400).send("닉네임, 연령대와 언어를 입력해주세요.")
      }
      else{
        res.status(400).send("닉네임과 연령대를 입력해주세요.")
      }
    }
    else{
      if (req.body.lang== null){
        res.status(400).send("닉네임과 언어를 입력해주세요.")
      }
      else{
        res.status(400).send("닉네임을 입력해주세요.")
      }
    }
  }
  else{
    if (req.body.age == null){
      if (req.body.lang== null){
        res.status(400).send("연령대와 언어를 입력해주세요.")
      }
      else{
        res.status(400).send("연령대를 입력해주세요.")
      }
    }
    else{
      if (req.body.lang== null){
        res.status(400).send("언어를 입력해주세요.")
      }
      else{
        if (((req.body.name).length>10)){
          res.status(400).send("닉네임은 10자 이하로 설정해주세요.")
        }
        else{
          db.collection('user').updateOne({id:req.params.userid},{$set: 
            {
              name : req.body.name,
              age : req.body.age,
              lang : req.body.lang
            }
            })
            res.status(200).send("프로필 생성 완료!")
        }
      }
    }
  }
})

app.get('/register/genre/:userid', (req, res)=>{
  if((req.body.genre)!=3){
    res.status(400).send("장르를 3개 선택해야 합니다!")
  }
  else{
    db.collection('user').findOne({id:req.params.userid},{$set:{
      genre: req.body.genre
    }})
    res.status(200).send("선호 장르 등록 완료!")
  }
})

app.get('/logout', (req, res, next) => {
  req.logOut(err => {
    if (err) {
      return next(err);
    } else {
      console.log('로그아웃됨')
    }
  });
});

app.get('/mypage/:userid', (req,res)=>{
  db.collection('user').findOne({id:req.params.userid}, (err,res2)=>{
    result  = res2
    book = result.book
    bookArray = []
      for (i=0; i<book.length; i++){
        db.collection('book').findOne({id:book[i]}, (err, res2)=>{
          foundBook = res2
        })
        bookArray.push({
          "bookId" : book[i].bookId,
          "title" : foundBook.title,
          "date": book[i].date,
          "bookImage" :foundBook.bookImage
        })
      }
    db.collection('quiz').find({userId: req.params.userid}).limit(2).toArray((err,res3)=>{
      quizArray = res3
      db.collection('word').find({userId: req.params.userid}).limit(6).toArray((err,res4)=>{
        wordArray = res4.map(doc => doc.word)
        res.send({
          "user": {
            "name":result.name,
            "age" : result.age,
            "lang" : result.lang,
            "level" : result.level,
            "userId" : result.id
          },
          "book": bookArray,
          "quiz" : quizArray,
          "word" : wordArray
        })
      })
    })
  })
})



function register(data){
  db.collection('user').insertOne({
    id : data.id,
    name : "",
    age : 0,
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

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '/front/build/index.html'));
});    