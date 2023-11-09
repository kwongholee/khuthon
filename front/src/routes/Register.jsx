import React, { useEffect, useState } from 'react'
import style from '../style/register.module.css';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {

  // const nickname = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{1,10}$/
  
  let [nickname, setNickname] = useState('hi')
  let [age, setAge] = useState('')
  let [language, setLanguage] = useState('')
  let [userId, setUserId] = useState('')
  let navigate = useNavigate()

  const fetchUserId = () => {
    axios.get('/authorization')  
            .then((res) => { 
                setUserId(res.data)
                console.log(userId)
            })
            .catch((err) => {
                console.log(err) 
        })
  }

  useEffect(() => {
    fetchUserId()
  },[])

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
          <button className={style.language_button}
          onClick={() => {setLanguage('한국어')}}>한국어</button>
          <button className={style.language_button}
          onClick={() => {setLanguage('영어')}}>영어</button>
        </div>
        <div className={style.language_container}>
          <button className={style.complete_button}
          onClick={() => {
            axios.post(`/register/profile`)
            .then((res) => {
                navigate(`/`)
            })
            .catch((err) => {
                console.log(err)
            })
          }}>이전</button>
          <button className={style.complete_button}
          onClick={() => {
            axios.post(`/register/profile`)
            .then((res) => {
                navigate(`/register/genre`)
            })
            .catch((err) => {
                console.log(err)
            })
          }}>다음</button>
        </div>
      </div>

    </div>
  )
}
