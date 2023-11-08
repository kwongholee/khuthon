import style from '../style/main.module.css';
import Background from '../components/Background';
import { useState } from 'react';
import axios from "axios"
// import logo from '../../public/logo.png'

export default function Main() {
  let [isLogged, setIsLogged] = useState(false)
  return(
    <div>
      {!isLogged ? <Start isLogged={isLogged} setIsLogged={setIsLogged}></Start> : <MainPage isLogged={isLogged} setIsLogged={setIsLogged}></MainPage>}
    </div>
  )
}

function Start(props) {
  return (
    <div>
    <Background></Background>
    <div>
      <div className={style.login_container}>
        <img className={style.logo} src={'logo.png'}></img>
        <h1> Welcome! </h1>
        <button className={style.login_button}
        onClick={() => {
          props.setIsLogged(true)
          axios.post('/login')
          .then((result) => {
              if (result.data) {
                  console.log('성공')
              }
              else { 
                  console.log('실패')
              }
          })
          .catch((err) => {
              console.log(err)
          })
          }}>구글 계정으로 로그인</button>
      </div>
      
    </div>
  </div>
  )
}
function MainPage(props) {
  return (
    <div className={style.main_background}> 
      <div id='위에 div' className={style.main_first_container}>
        <div>
          <div className={style.main_logo}></div>
            <div id='사진, 언어, 로그아웃' className={style.main_profile}>
              <button onClick={() => {
                props.setIsLogged(false)
                axios.post('/logout')
                .then((result) => {
                    if (result.data) {
                        console.log('성공')
                    }
                    else { 
                        console.log('실패')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
                }}>Logout</button>
            </div>
          </div>
        <div id='최근에 읽은 책' className={style.recent_book}></div>   
      </div>
      <div id='아래 div'>
        <div id='책 추천 (레벨별)'></div>   
        <div id='책 추천 (장르별)'></div>   
        <div id='책 목록'></div>   
      </div>
    </div>
  )
}