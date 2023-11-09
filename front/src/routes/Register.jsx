import React, { useState } from 'react'
import style from '../style/register.module.css';
import Logo from '../components/Logo';

export default function Register() {

  // const nickname = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{1,10}$/
  
  let [nickname, setNickname] = useState('hi')
  let [age, setAge] = useState('')
  let [language, setLanguage] = useState('한국어')


  return (
    <div className={style.container}>
      <Logo></Logo>
      <div>
        <div className={style.profile_container}>
          <img className={style.profile}></img>
        </div>
        <div className={style.name_container}>
          <input className={style.input_name} placeholder='이름을 입력하세요.'
          onChange={(e) => {setNickname(e.target.value)}}></input>
          <p className={style.alert_name}>이름 입력해라</p>
        </div>
        <div className={style.age_container}>
          <p className={style.age_p}>연령</p>
          <select className={style.age_select}>
            <option>10세 이하</option>
            <option>10대</option>
            <option>20대</option>
            <option>30대</option>
            <option>40대</option>
            <option>50대</option>
            <option>60대</option>
            <option>70세 이상</option>
          </select>
        </div>
        <div className={style.language_container}>
          <button className={style.language_button}>한국어</button>
          <button className={style.language_button}>영어</button>
        </div>
        <div className={style.language_container}>
          <button className={style.complete_button}>이전</button>
          <button className={style.complete_button} onClick={() => {console.log(nickname)}}>다음</button>
        </div>
      </div>

    </div>
  )
}
