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
const {execSync} = require('child_process')
const {ObjectId} = require('mongodb')
const fs = require('fs')

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
    lang = result.lang
    db.collection('book').find().toArray((err,result2)=>{
      res.send({"user": result, "book": result2 })
    })
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
        res.redirect(`/mainpage/${req.user.id}`)
      }
    })
  } catch (err) {
    console.log(err)
    res.status(400)
  }
});

app.get('/authorization',(req,res)=>{
  if (req.user){
    db.collection('user').findOne({id:req.user.id}, (err,result)=>{
      res.send({isLogined: "Logined", userid: req.user.id, profileImage : result.profileImage})
    })
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
                lang : req.body.lang,
                profileImage : req.body.profileImage
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
  req.session.destroy()
  res.clearCookie('connect.sid');
  res.send("Logged Out")
});

app.get('/mypage/:userid', (req,res)=>{
  db.collection('user').findOne({id:req.params.userid}, (err,res2)=>{
    result  = res2
    lang = result.lang
    let level;
    bookArray=[]
    if (result.book != null){
      book = result.book
      for (i=0; i<book.length; i++){
        db.collection('book').findOne({id:book[i]}, (err, res2)=>{
          foundBook = res2
          if(lang=='eng'){
            title =foundBook.engTitle
            if(result.engLevel==null){
              level = null
            }
            else{
              level = result.engLevel
            }
          }
          else{
            if(result.korLevel==null){
              level = null
            }
            else{
              level = result.korLevel
            }
          }
        })
        bookArray.push({
          "bookId" : book[i].bookId,
          "title" : title,
          "date": book[i].date,
          "bookImage" :foundBook.bookImage
        })
      }
    }
    db.collection('quiz').find({userId: req.params.userid, lang: lang}).limit(2).toArray((err,res3)=>{
      quizArray = res3
      db.collection('word').find({userId: req.params.userid, lang: lang}).limit(6).toArray((err,res4)=>{
        wordArray = res4.map(doc => doc.word)
        res.send({
          "user": {
            "name":result.name,
            "profileImage":result.profileImage,
            "age" : result.age,
            "lang" : result.lang,
            "level" : level,
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

app.put('/book/userid/bookid',(req,res)=>{

})

app.get('/wordlist/:userid', (req, res)=>{
  db.collection('user').findOne({id:'111695717319585087284'}, (err, result)=>{
    console.log(result.lang)
    lang = result.lang
    page = parseInt(req.query.page,10)
    db.collection('word').find({userId: req.params.userid, lang:lang}).sort({ bookId: 1 }).skip((page-1)*10).limit(10).toArray((err,result)=>{
      wordArray = []
      console.log(result)
      if (result.length!=0){
        for (i=0; i<result.length; i++){
          wordArray.push({"word":result[i].word[0], "wordId":result[i]._id, "bookId": result[i].bookId})
        }
        res.send({"wordList":wordArray})
      }
      else{
        res.status(400)
      }
    })
  })
})

app.post('/quiz/result', (req, res)=>{
  now = new Date();
  year = now.getFullYear();
  month = now.getMonth() + 1;
  day = now.getDate();
  date = (`${year}-${month}-${day}`);
  let lang;
  db.collection('user').findOne({id:req.user.id},(err,result)=>{
    lang = result.lang
  })
  db.collection('quiz').insertOne({
    "rightNum" : req.body.rightNum,
    "totalNum" : req.body.totalNum,
    "wordList" : req.body.result,
    "userId": req.user.id,
    "date" : date,
    "lang" : lang,
    "bookId" : req.body.bookId
    })
  for(i=0; i<req.body.result.length; i++){
    word = req.body.result[i].word
    right = req.body.result[i].right
    if (right==0){
      db.collection('word').updateOne({word:word}, {$inc: {testNum:1}})
    }
    else{
      db.collection('word').deleteOne({word:word}, (err,res2)=>{
        if (err) throw err
      })
    }
  }
})

app.get('/quiz/:bookid', (req, res)=>{
  db.collection('book').findOne({_id:ObjectId(req.params.bookid)}, (err, result)=>{
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
            "wordList" : result[i].wordList,
            'bookId': result2.bookId
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
    if(result.book!=null){
      bookArray = [...result.book]
      foundBook = false
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
          bookArray[i].position = req.body.position
          foundBook = true
          break
        }
        if(foundBook==false){
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, '0'); 
          const day = String(now.getDate()).padStart(2, '0');
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const seconds = String(now.getSeconds()).padStart(2, '0');
          const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          bookArray.push({"postion":req.body.position, "bookId":req.params.bookid, "date":formattedDateTime})
        }
      }
      db.collection('user').updateOne({id: req.params.userid},{$set:{
        book : bookArray
      }})
    }
    else{
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); 
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      bookArray.push({"postion":req.body.position, "bookId":req.params.bookid, "date":formattedDateTime})
    }
  })
})

var startTime = 0

app.post('/book', (req,res)=>{
  var startTime = new Date()
  res.status(200)
})

app.get('/book', (req,res)=>{
  res.send('hi')
})


app.post('/book/word/:userid/:bookid',async (req,res)=>{
  let lang;
  db.collection('user').findOne({id:req.params.userid},(req,result)=>{
    lang = result.lang
  })
  wordList = req.body.wordList
  if(wordList.length==0 || wordList.length>10){
    res.status(400)
  }
  else{
      if(lang=="kor"){
      pythonPath = path.resolve(__dirname,'./morpheme_kor.py')
      let result;
      try {
        result = execSync(`python3 ${pythonPath} '${JSON.stringify(wordList)}'`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
        result = result.trim()
        result = eval(result)
        console.log(result)
      } catch (error) {
          console.error('에러:', error.message);
      }
      for(i=0; i<wordList.length; i++){
        let total = 0, totalNum=0
        for (j=0; j<result[i].length; j++){
          if(result[i][j][1]!=-1){
            total+=result[i][j][1]
            totalNum +=1
          }
        }
        db.collection('word').insertOne({
          word: wordList[i],
          lang : "kor",
          bookId: req.params.bookid,
          userId : req.params.userid,
          level : total/totalNum,
          testNum : 0
        })
      }
    }
    else{
      pythonPath = path.resolve(__dirname,'./morpheme_eng.py')
      let result;
      try {
        result = execSync(`python3 ${pythonPath} '${JSON.stringify(wordList)}'`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
        result = result.trim()
        result = eval(result)
        for(i=0; i<wordList.length; i++){
          const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${result[i]}/frequency`,
            headers: {
              'X-RapidAPI-Key': '8ab9d90422msh45535b94ba1a1a9p192899jsn3d0ceb2ac5d3',
              'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
          };
          try {
            const response = await axios.request(options);
            let freq = response.data.frequency.perMillion
            db.collection('word').insertOne({
              word: wordList[i],
              lang : "eng",
              bookId: req.params.bookid,
              userId : req.params.userid,
              level : freq
            })
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
          console.error('에러:', error.message);
      }
    }
  }
})

app.get('/book/word/:userid/:bookid',(req,res)=>{
  var endTime = new Date();
  var executionTime = endTime - startTime;
  var executionTimeInSeconds = executionTime / 1000; //초
  var executionTimeInMinutes = executionTime / (1000 * 60);//분
  res.send({"time": executionTime})
})

app.get('/quiz/word/:userid',(req,res)=>{
  db.collection('book').findOne({_id:ObjectId(req.body.bookId)},(err,result)=>{
    inputArray = []
    let lang;
    for(i=0; i<req.body.word.length; i++){
      db.collection('word').findOne({word:req.body.word[i]},(err,res2)=>{
        inputArray.push([req.body.word[i],res2.testNum])
        lang = res2.lang
      })
    }
    lang="kor"
    pythonPath = path.resolve(__dirname,`./make_quiz_${lang}.py`)
    let pyResult;
    try {
      pyResult = execSync(`python3 ${pythonPath} '${JSON.stringify(inputArray)}'`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
      pyResult = pyResult.trim()
      pyResult = eval(pyResult)
      res.send({"quiz":pyResult, "bookId":req.body.bookId, "bookImage":result.bookImage})
    } catch (error) {
        console.error('에러:', error.message);
    }
  })
})

function register(data){
  db.collection('user').insertOne({
    id : data.id,
    name : "",
    profileImage : 0,
    age : 0,
    engLevel : null,
    korLevel: null,
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