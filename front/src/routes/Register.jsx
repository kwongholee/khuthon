import React from 'react'
import style from '../style/register.module.css';
import Logo from '../components/Logo';

export default function Register() {
  return (
    <div className={style.container}>
      <Logo></Logo>
      <div>
        <img className={style.profile}></img>
        <div className={style.name_container}>
          <input className={style.input_name} placeholder='이름을 입력해주세요.'></input>
          <p> 이름을 입력해야 합니다! </p>
        </div>
        <div className='연령'>
          <p>연령</p>
          <select>
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
        <div className='한국어? 언어?'>
          <button className='한국어'></button>
          <button className='영어'></button>
        </div>
        <div className='이전 다음 버튼'>
          <button className='이전 버튼'></button>
          <button className='다음 버튼'></button>
        </div>

        <p> register</p>
      </div>

    </div>
  )
}
