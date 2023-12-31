import React, { useEffect, useState } from 'react'
import style from '../style/register.module.css';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {setUserId, setLang, setImage} from '../redux/user'


export default function Register() {

  const regexName = /^[가-힣a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ]{1,10}$/

  let user = useSelector((state) => state.user);
  let imageidx = [1, 2, 3 ,4]
  let [image, setImage] = useState(0)
  

  let [nickname, setNickname] = useState('')
  let [age, setAge] = useState('')
  // let [language, setLanguage] = useState('')
  // let [userId, setUserId] = useState('')

  let navigate = useNavigate()
  let dispatch = useDispatch()

  const fetchUserId = async () => {
    try {
      // console.log(window.innerWidth)
      // console.log(window.innerHeight)
      const response = await axios.get('/authorization');
      const serverUserId = response.data.userid;
      dispatch(setUserId(serverUserId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserId()
  },[dispatch])

  const onSelect = (e) => {setAge(e.target.value)}

  return (
    <div className={style.container}>
      <Logo></Logo>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <div className={style.profile_container}>
            {imageidx.map((a,i) => {
              return (
                <div>
                  <img src={'/profile-' + a + '.png'} className={style.profile}
                    onClick={() => {
                      setImage(a)
                      console.log(a)
                    }}></img>
                </div>
              )
            }) }
        </div>
        <div className={style.name_container}>
          <input className={style.input_name} placeholder='닉네임을 입력하세요.'
          onKeyUp={(e) => {
            const inputName = e.target.value;
            setNickname(inputName);
          }}></input>
          <p className={style.alert_name} style={{ display: !regexName.test(nickname) ? 'block' : 'none' }}> 닉네임은 한글, 영문 대소문자, 숫자로 1~10자까지 입력 가능합니다. </p>
          <p className={style.good_name} style={{ display: !regexName.test(nickname) ? 'none' : 'block' }}> 훌륭한 닉네임이네요! </p>
        </div>
        <div className={style.age_container}>
          <p className={style.age_p}>연령</p>
          <select className={style.age_select}
            value = {age} onChange={onSelect}>
            <option value="0">10세 이하</option>
            <option value="10">10대</option>
            <option value="20">20대</option>
            <option value="30">30대</option>
            <option value="40">40대</option>
            <option value="50">50대</option>
            <option value="60">60대</option>
            <option value="70">70세 이상</option>
          </select>
        </div>
        <div className={style.language}>
          <div className={style.language_container}>
            <button className={style.language_button}
            onClick={() => {dispatch(setLang('kor'))}}>한국어</button>
            <button className={style.language_button}
            onClick={() => {dispatch(setLang('eng'))}}>영어</button>
          </div>
          <p className={style.alert_name} style={{ display: user.lang == '' ? 'block' : 'none' }}> 배우고 싶은 언어를 선택해주세요.</p>
          <p className={style.good_name} style={{ display: user.lang == 'kor' || user.lang == 'eng' ? 'block' : 'none' }}> 화이팅! </p>
        </div>
        <div className={style.language_container}>

        <button
          className={style.complete_button}
          onClick={async () => {
            try {
              const res = await axios.put(`/register/profile/${user.userId}`, { button: 'prev' });
              navigate(`/`);
            } catch (err) {
              console.error(err);
            }
          }}>이전</button>
          <button className={style.complete_button}
          onClick={() => {
            if(nickname!='' && user.lang!='') {
              const newUser = {
                name : nickname,
                age : age,
                lang : user.lang,
                profileImage : image
              }
              console.log(newUser)
              axios.put(`/register/profile/${user.userId}`, newUser)
              .then((res) => {
                navigate(`/register/genre/${user.userId}`)
              })
              .catch((err) => {
                  console.log(err)
              })
            }
          }}>다음</button>
        </div>
      </div>

    </div>
  )
}