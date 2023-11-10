import React, { useEffect, useRef, useState } from 'react'
import Logo from '../components/Logo';
import axios from 'axios';
import style from '../style/genre.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setUserId} from '../redux/user'


export default function Genre() {
    let userId = useSelector((state) => state.user.userId);
    
    let genres = ['thriller', 'fantasy', 'science', 'history', 'horror', 'crime', 'romance', 'psychology', 'sports', 'travel', 'social', 'math']
    let [genre, setGenre] = useState([])
    let [isActive, setIsActive] = useState([false, false, false, false, false, false, false, false, false, false, false, false])
    let [count, setCount] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    let navigate =  useNavigate();
    let dispatch = useDispatch();

  //중복되는 함수니까 나중에 함수 파일 하나 만들어야 할 듯?
  const fetchUserId = async () => {
    try {
      const response = await axios.get('/authorization');
      const serverUserId = response.data.userid;
      dispatch(setUserId(serverUserId));
      console.log('userId : ', userId)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserId()
  },[])


  const handleFocus = (index) => {
    const updateCount = [...count]
    updateCount[index]++;
    setCount(updateCount)
    console.log(count)

    const updatedIsActive = [...isActive];
    if (count[index] % 2 == 0) 
        updatedIsActive[index] = true;
    
    else 
        updatedIsActive[index] = false;
    setIsActive(updatedIsActive);
  };

  useEffect(() => {
    countTrueValues(isActive)
  }, [isActive])
  
  const countTrueValues = (array) => {
    return array.filter(value => value === true).length;
  };

  const trueCount = countTrueValues(isActive);

  return (
    <div className={style.container}>
      <Logo></Logo>
      <p>선호하는 책의 장르 3가지를 선택해주세요.</p>
      <div className='버튼들'>
        <div className={style.button_container}>
            <button className={style.genre_button}
            onClick={() => handleFocus(0)}
            style={{ background: isActive[0] ? 'lightgray' : 'white' }}>스릴러</button>
            <button id="1" className={style.genre_button}
            onClick={() => handleFocus(1)}
            style={{ background: isActive[1] ? 'lightgray' : 'white' }}>판타지</button>
            <button id="2" className={style.genre_button}
            onClick={() => handleFocus(2)}
            style={{ background: isActive[2] ? 'lightgray' : 'white' }}>과학</button>
        </div>
        <div className={style.button_container}>
            <button id="3" className={style.genre_button}
            onClick={() => handleFocus(3)}
            style={{ background: isActive[3] ? 'lightgray' : 'white' }}>역사</button>
            <button id="4" className={style.genre_button}
            onClick={() => handleFocus(4)}
            style={{ background: isActive[4] ? 'lightgray' : 'white' }}>호러</button>
            <button id="5" className={style.genre_button}
            onClick={() => handleFocus(5)}
            style={{ background: isActive[5] ? 'lightgray' : 'white' }}>범죄</button>
        </div>
        <div className={style.button_container}>
            <button id="6" className={style.genre_button}
            onClick={() => handleFocus(6)}
            style={{ background: isActive[6] ? 'lightgray' : 'white' }}>로맨스</button>
            <button id="7" className={style.genre_button}
            onClick={() => handleFocus(7)}
            style={{ background: isActive[7] ? 'lightgray' : 'white' }}>심리학</button>
            <button id="8" className={style.genre_button}
            onClick={() => handleFocus(8)}
            style={{ background: isActive[8] ? 'lightgray' : 'white' }}>스포츠</button>
        </div>
        <div className={style.button_container}>
            <button id="9" className={style.genre_button}
            onClick={() => handleFocus(9)}
            style={{ background: isActive[9] ? 'lightgray' : 'white' }}>여행</button>
            <button id="10" className={style.genre_button}
            onClick={() => handleFocus(10)}
            style={{ background: isActive[10] ? 'lightgray' : 'white' }}>인문, 사회</button>
            <button id="11" className={style.genre_button}
            onClick={() => handleFocus(11)}
            style={{ background: isActive[11] ? 'lightgray' : 'white' }}>수학</button>
        </div>
      </div>
      <button
        className='버튼'
        onClick={async () => {
            try {
                let updatedGenre = genre;
                for (let i = 0; i < 12; i++) {
                    if (isActive[i]) 
                        updatedGenre = [...updatedGenre, genres[i]];
                }
                setGenre(updatedGenre);
                console.log(updatedGenre);

                if (trueCount === 3) {
                    await axios.put(`/register/genre/${userId}`, updatedGenre);
                    navigate(`/main`);
                }
            } catch (err) {
                console.error(err);
            }
        }}>
        프로필 생성하기
        </button>


    </div>
  )
}
