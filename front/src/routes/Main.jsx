import style from '../style/main.module.css';
import axios from "axios"
import Logo from '../components/Logo';
import LeftBtn from '../components/LeftBtn'
import RightBtn from '../components/RightBtn'
import { useNavigate } from 'react-router-dom';
import {useSelector,  useDispatch } from 'react-redux'
import { setLang, setUserId } from '../redux/user';
import { addRecentBook } from '../redux/recentBook';
import { useEffect } from 'react';

export default function Main() {
  let navigate =  useNavigate();
  let dispatch = useDispatch();

  let userId = useSelector((state) => state.user.userId);
  let lang = useSelector((state) => state.user.lang);
  let recentBook = useSelector((state) => state.recentBook);

  const recommend_books = [
    { title: '책 제목 1' },
    { title: '책 제목 2' },
    { title: '책 제목 3' },
    { title: '책 제목 4' },
    { title: '책 제목 5' },
  ];
  const book_list = [
    { title: '책 제목 1' },
    { title: '책 제목 2' },
    { title: '책 제목 3' },
    { title: '책 제목 4' },
    { title: '책 제목 5' },
  ];

  const fetchUserId = async () => {
    try {
      const response = await axios.get('/authorization');
      const serverUserId = response.data.userid;
      dispatch(setUserId(serverUserId));
      console.log(userId)
    } catch (error) {
      console.error(error);
    }
  };

  //프사랑 언어랑 최근 읽은 책 가져오기
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`/mypage/${userId}`);
      const serverLang = response.data.user.lang
      const serverRecentBook = response.data.book
      dispatch(setLang(serverLang));
      dispatch(addRecentBook(serverRecentBook));
      console.log(recentBook)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMain = async () => {
    try {
      const response = await axios.get('/main');
      console.log('good')
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMain()
    fetchUserId()
    fetchUserInfo()
  }, [])

  return (
    <div className={style.main_background}> 
      <div id='위에 div' className={style.first_container}>
        <div>
          <div className={style.main_logo}>
            <Logo></Logo>
          </div>
            <div id='사진, 언어, 로그아웃' className={style.profile}>
              <div id='프로필' className={style.profile_left}></div>
              <div id='언어, 로그아웃' className={style.profile_right}>
                <select className={style.select_language}>
                  <option>한국어</option>
                  <option>영어</option>
                </select>
                <button className={style.logout_button}
                onClick={async () => {
                  try {
                    const res = await axios.get(`/logout`);
                    navigate(`/`);
                  } catch (err) {
                    console.error(err);
                  }
                }}>로그아웃</button>
              </div>
              
            </div>
          </div>
        <div className={style.recent_book}>
          {recentBook.length === 1 ? 
            (
            <div>
              <p className={style.recent_none}> 읽은 책이 아직 없어요.</p>
              {console.log("근데 아마 1일걸?", recentBook.length)}
            </div>
            )
          : (
            <div>
              <div className={style.recent_book}>
                <div className={style.recent_book_left}>
                  <div className={style.recent_book_image}></div>
                </div>
                  <div className={style.recent_book_right}>
                    <h3>{recentBook[recentBook.length-1].title}</h3>
                    <p className={style.recent_book_content}>{recentBook[recentBook.length-1].date}</p>
                  </div>
              </div>
              <button className={style.read_button}>마저 읽기</button>
            </div>
          )
          }
        </div>   
      </div>
        <div id='책추천' className={style.list_container}>
          <div className={style.list_title}>이런 책은 어떠세요?</div>
          <LeftBtn className={style.left_icon}></LeftBtn>
          <RightBtn className={style.right_icon}></RightBtn>
          <div className={style.recommend_book}>
            {
              recommend_books.map((book, index) => (
                <div key={index} className={style.book_container}>
                  <div className={style.book}></div>
                  <p className={style.book_title}>{book.title}</p>
                </div>
              ))
            }
          </div>   
        </div>
        <div id='책목록' className={style.list_container}>
          <div className={style.list_title}>책 목록</div>
          <LeftBtn className={style.left_icon}></LeftBtn>
          <RightBtn className={style.right_icon}></RightBtn>
          <div className={style.book_list}>
            {
              book_list.map((book, index) => (
                  <div key={index} className={style.book_container}>
                    <div className={style.book}></div>
                    <p className={style.book_title}>{book.title}</p>
                  </div>
                ))
            }
          </div>   
        </div>
    </div>
  )
}

