import style from '../style/main.module.css';
import axios from "axios"
import Logo from '../components/Logo';
import LeftBtn from '../components/LeftBtn'
import RightBtn from '../components/RightBtn'
import { useNavigate } from 'react-router-dom';
import {useSelector,  useDispatch } from 'react-redux'
import { setImage, setLang, setUserId } from '../redux/user';
import { addRecentBook } from '../redux/recentBook';
import { useEffect, useState } from 'react';
import { setPosition } from '../redux/page';

export default function Main() {
  let navigate =  useNavigate();
  let dispatch = useDispatch();

  let user = useSelector((state) => state.user)
  let userId = user.userId
  let lang = user.lang
  let image = useSelector((state) => state.user.image);
  let page = useSelector((state) => state.page);
  let currentPosition = page.currentPosition

  let recentBook = useSelector((state) => state.recentBook);
  let bookId = recentBook.boodId
  let [books, setBooks] = useState([])
  // let books = []

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
  const onSelect = (e) => {
    console.log(e.target.value)
    if (e.target.value == '한국어')
      dispatch(setLang('kor'))
    else
      dispatch(setLang('eng'))
  }


  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('/authorization');
      const serverUserId = response.data.userid;
      const serverImage = response.data.profileImage
      dispatch(setUserId(serverUserId));
      dispatch(setImage(serverImage))
    } catch (error) {
      console.error(error);
    }
  };

  //프사랑 언어랑 최근 읽은 책 가져오기
  const fetchUserLang = async () => {
    try {
      const response = await axios.get(`/mypage/${userId}`);
      // const serverLang = response.data.lang
      // const serverRecentBook = response.data.book
      const serverPosition = response.data.user.position
      // dispatch(setLang(serverLang));
      // dispatch(addRecentBook(serverRecentBook));
      dispatch(setPosition(serverPosition))
      // console.log(serverLang)
      console.log(serverPosition)
      // console.log(serverRecentBook)
    } catch (error) {
      console.error(error);
    }
  };  

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`/main`);
      let serverBooks = response.data.book
      setBooks(serverBooks)
      console.log(books)
    } catch (error) {
      console.error(error);
    }
  };  
  
  useEffect(() => {
    fetchUserInfo()
    fetchBooks()
  }, [])

  return (
    <div className={style.main_background}> 
      <div id='위에 div' className={style.first_container}>
        <div>
          <div className={style.main_logo}>
            <Logo></Logo>
          </div>
            <div id='사진, 언어, 로그아웃' className={style.profile}>
              <div id='프로필' className={style.profile_left}>
                <img src={'/profile-' + image + '.png'} className={style.profile_image}
                onClick={() => {
                  axios.get(`/mypage/${userId}`)
                  .then((res) => {
                    navigate(`/mypage/${userId}`)
                  })
                  .catch((err) => {
                      console.log(err)
                  })
                }}></img>
              </div>
              <div id='언어, 로그아웃' className={style.profile_right}>
                  <select className={style.select_language} onChange={onSelect}>
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
                  <img src={recentBook[recentBook.length-1].bookImage} className={style.recent_book_image}></img>
                </div>
                  <div className={style.recent_book_right}>
                    <h3>{recentBook[recentBook.length-1].title}</h3>
                    <p className={style.recent_book_content}>{recentBook[recentBook.length-1].date}</p>
                  </div>
              </div>
              <button className={style.read_button}
                onClick={async () => {
                  try {
                    const newBookId = recentBook[recentBook.length - 1].bookId;
                    console.log(newBookId);

                    // 데이터를 요청 본문에 보내려면 아래와 같이 수정
                    const response = await axios.get(`/book`);
                    // currentPosition = response.data.position
                    navigate(`/book/${newBookId}`);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >마저 읽기</button>
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
            books.slice(7, 11).map((book, index) => (
                <div key={index} className={style.book_container}>
                  <img className={style.book_image} src={books[index].bookImage} alt={books[index].korTitle} />
                  <p className={style.book_title}>{books[index].korTitle}</p>
                </div>
              ))}
            </div>   
        </div>
        <div id='책목록' className={style.list_container}>
          <div className={style.list_title}>현재 읽을 수 있어요!</div>
          <LeftBtn className={style.left_icon}></LeftBtn>
          <RightBtn className={style.right_icon}></RightBtn>
          <div className={style.book_list}>
            {books.slice(0, 5).map((book, index) => (
              <div key={index} className={style.book_container}>
                <img className={style.book_image} src={books[index].bookImage} alt={books[index].korTitle} />
                <p className={style.book_title}>{books[index].korTitle}</p>
              </div>
            ))}
          </div> 
        </div>
    </div>
  )
}

