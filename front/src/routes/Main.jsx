import style from '../style/main.module.css';
import Background from '../components/Background';
import { useState } from 'react';
import axios from "axios"


//userid 묻는 get 요청 하나 쏘기, 등록하면 post도 쏘기
export default function Main() {
  let [isLogged, setIsLogged] = useState(false)
  return(
    <div>
      <Start></Start>
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
        <form method="GET" action="/login">
          <button className={style.login_button}
          onClick={() => {
            props.setIsLogged(true)
            
          }}>구글 계정으로 로그인</button>
        </form>
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
                axios.get('/logout')
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