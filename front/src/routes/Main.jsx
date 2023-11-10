import style from '../style/main.module.css';
import axios from "axios"
import Logo from '../components/Logo';
import LeftBtn from '../components/LeftBtn'
import RightBtn from '../components/RightBtn'


//userid 묻는 get 요청 하나 쏘기, 등록하면 post도 쏘기
export default function Main() {
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
                onClick={() => {
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
                  }}>로그아웃</button>
              </div>
              
            </div>
          </div>
        <div id='최근에 읽은 책' className={style.recent_book}></div>   
      </div>
        <div className={style.list_container}>
          <div className={style.list_title}>이런 책은 어떠세요?</div>
          <LeftBtn className={style.left_icon}></LeftBtn>
          <RightBtn className={style.right_icon}></RightBtn>
          <div className={style.recommend_book}></div>   
        </div>
        <div className={style.list_container}>
          <div className={style.list_title}>책 목록</div>
          <LeftBtn className={style.left_icon}></LeftBtn>
          <RightBtn className={style.right_icon}></RightBtn>
          <div className={style.book_list}></div>   
        </div>
    </div>
  )
}

