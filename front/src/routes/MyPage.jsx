import { useSelector } from 'react-redux';
import style from '../style/mypage.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LeftBtn from '../components/LeftBtn'
import RightBtn from '../components/RightBtn'
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  let image = useSelector((state) => state.user.image);
  let userId = useSelector((state) => state.user.userId);
  let navigate = useNavigate()
  let [userInfo, setUserInfo] = useState({
    name : '',
    age : '',
    lang : '',
    level : 1
  })

  const recent_books = [
    { title: '책 제목 1' },
    { title: '책 제목 2' },
    { title: '책 제목 3' },
    { title: '책 제목 4' },
    { title: '책 제목 5' },
  ];

  const recent_voca = [
    {voca1 : '단어단어단어단어1'},
    {voca2 : '단어단어단어단어2'},
    {voca3 : '단어단어단어단어3'},
    {voca4 : '단어단어단어단어4'},
    {voca5 : '단어단어단어단어5'},
    {voca6 : '단어단어단어단어6'}
  ]

  const fetchLevel = async () => {
    try {
      const response = await axios.get(`/mypage/${userId}`);
      let lang;
      if (response.data.user.lang == 'eng')
        lang = '영어'
      else
        lang = '한국어'
      const { name, age, level} = response.data.user;

      setUserInfo({
        name : name,
        age : age,
        lang : lang,
        level : level,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLevel()
  }, [])
  
  return(
      <div className={style.background}> 
        <div id='위에 div' className={style.first_container}>
          <div className={style.profile}>
            <div className={style.profile_left}>
              <img src={'/profile-' + image + '.png'} className={style.profile_image}></img>
            </div>
            <div className={style.profile_right}>
              {/* <button onClick={() => {console.log(name, age, lang, level)}}>데이터 확인해라</button> */}
              <p className={style.profile_info}>이름 : {userInfo.name} </p>
              <p className={style.profile_info}>연령 : {userInfo.age}</p>
              <p className={style.profile_info}>언어 : {userInfo.lang}</p>
              <p className={style.profile_info}>Reading Level : {userInfo.level}</p>
            </div>
          </div>
          <div className={style.level_container}>
            <img src={'/level-' + userInfo.level + '.png'} className={style.level}></img>
          </div>
        </div>

        <div id='책추천' className={style.list_container}>
          <div className={style.list_title}>최근에 읽었어요</div>
          <LeftBtn className={style.left_icon}></LeftBtn>
          <RightBtn className={style.right_icon}></RightBtn>
          <div className={style.recommend_book}>
            {
              recent_books.map((book, index) => (
                <div key={index} className={style.book_container}>
                  <div className={style.book}></div>
                  <p className={style.book_title}>{book.title}</p>
                </div>
              ))
            }
          </div>   
        </div>
        <div className={style.second_container}>
          <div>
            <div style={{display: 'flex', justifyContent:'space-between', alignItems:"flex-end", width: '616px'}}>
              <div className={style.list_title}> 최근에 응시한 퀴즈</div>
              <button className={style.plus_button}
              onClick={() => {navigate(`/quiz?page=1`)}}>더보기</button>
            </div>
            <div className={style.quiz_container}>
              <div className={style.book}></div>
              <div className={style.book}></div>
            </div>   
          </div>
          <div>
            <div style={{display: 'flex', justifyContent:'space-between', alignItems:"flex-end", width: '616px'}}>
              <div className={style.list_title}> 최근에 저장한 단어</div>
              <button className={style.plus_button}
              onClick={() => {navigate(`/showwordlist/${userId}?page=1`)}}>더보기</button>
            </div>
            <div className={style.quiz_container}>
              <div>
                <ul  className={style.voca_container}>
                  <li className={style.voca}>단어단어단어단어1</li>
                  <li className={style.voca}>단어단어단어단어2</li>
                  <li className={style.voca}>단어단어단어단어3</li>
                </ul>
              </div>
              <div>
                <ul className={style.voca_container}>
                  <li className={style.voca}>단어단어단어단어4</li>
                  <li className={style.voca}>단어단어단어단어5</li>
                  <li className={style.voca}>단어단어단어단어6</li>
                </ul>
              </div>

            </div>  
          </div>
        </div>   

      </div>
  )
}