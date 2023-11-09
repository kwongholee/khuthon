import style from '../style/main.module.css';
import Background from '../components/Background';
import { useState } from 'react';
import axios from "axios"

export default function Login() {
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
                }}>구글 계정으로 로그인</button>
            </form>
        </div>
      </div>
    </div>
    )
  }