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
        res.redirect('/mainpage')
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

app.put('/register/profile/:userid',(req, res)=>{
  button = req.body.button
  if (button == "prev"){
    db.collection('user').deleteOne({id:req.user.id},(err,result)=>{
      if (err) throw err
    })
    req.session.destroy()
    res.clearCookie('connect.sid');
    res.send("session destroyed")
  }
  else{
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
  }
  
})

app.put('/register/genre/:userid', (req, res)=>{
  if((req.body).length!=3){
    res.status(400).send("장르를 3개 선택해야 합니다!")
  }
  else{
    db.collection('user').updateOne({id:req.params.userid},{$set:{
      genre: req.body

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
            "profileImage":result.profileImage,
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

app.get('/wordlist/:userid', (req, res)=>{
  page = int(req.query.page)
  db.collection('word').find({userId: req.params.userid}).skip((page-1)*10).limit(10).toArray((err,result)=>{
    wordArray = []
    if (result.length!=0){
      for (i=0; i<result.length; i++){
        wordArray.push({"word":result[i].word[0], "wordId":result[i]._id})
      }
      res.send({"wordList":wordArray})
    }
    else{
      res.status(400)
    }
  })
})

app.put('/quiz/result/:quizid', (req, res)=>{
now = new Date();
year = now.getFullYear();
month = now.getMonth() + 1;
day = now.getDate();
date = (`${year}-${month}-${day}`);
  db.collection('quiz').updateOne({_id: req.params.quizid},{$set: {
    "rightNum" : req.body.rightNum,
    "totalNum" : req.body.totalNum,
    "wordList" : req.body.result,
    "date" : date
  }}, (err, result)=>{
    if (err) throw err
})
})

app.get('/quiz/:bookid', (req, res)=>{
  db.collection('book').findOne({_id:req.params.bookid}, (err, result)=>{
    res.send({"title":result.title, "bookImage":result.bookImage})
  })
})

app.get('/quiz/:userid', (req,res)=>{
  page = int(req.query.page)
  db.collection('quiz').find({userId : req.params.userid}).skip((page-1)*4).limit(4).toArray((err,result)=>{
    if (result.length!=0){
      quizArray = []
      for (i=0; i<result.length; i++){
        book = result[i].bookId
        db.collection('book').findOne({bookId: book}, (err,result2)=>{
          quizArray.push({
            "date" : result[i].date,
            "title" : result2.title,
            "wordList" : result[i].wordList
          })
        })
      }
      res.send({"quiz" : quizArray})
    }
    else{
      res.status(400)
    }
  })
})

app.put('/book/:userid/:bookid', (req,res)=>{
  db.collection('user').findOne({id: req.params.userid},(err,result)=>{
    bookArray = [...result.book]
    for(i=0; i<bookArray.length; i++){
      if(bookArray[i].bookId == req.params.bookid){
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); 
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        bookArray[i].date = formattedDateTime
        bookArray[i].page = req.body.page
        break
      }
    }
    db.collection('user').updateOne({id: req.params.userid},{$set:{
      book : bookArray
    }})
  })
})

var startTime = 0

app.post('/book', (req,res)=>{
  var startTime = new Date()
  res.status(200)
})

app.post('/book/word/:userid/:bookid',(req,res)=>{
  wordList = req.body.wordList
  if(wordList.length==0 || wordList.length>10){
    res.status(400)
  }
  else{
    for(i=0; i<wordList.length; i++){
      
      db.collection('word').insertOne({
        word: wordList[i],
        bookId: req.params.bookid,
        userId : req.params.userid,
        level : ""
      })
    }
  }
})

app.get('/book/word/{userid}/{bookid}',(req,res)=>{
  var endTime = new Date();
  var executionTime = endTime - startTime;
  var executionTimeInSeconds = executionTime / 1000; //초
  var executionTimeInMinutes = executionTime / (1000 * 60);//분
  res.send({"time": executionTime})
})

function register(data){
  db.collection('user').insertOne({
    id : data.id,
    name : "",
    profileImage : 0,
    age : 0,
    level : null,
    lang : null,
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