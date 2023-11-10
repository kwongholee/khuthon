import style from '../style/quizstart.module.css';
import Logo from '../components/Logo';
import ProfileImage from '../components/ProfileImage';
import { useNavigate, useParams } from 'react-router-dom';

export default function QuizStart() {
  let {bookid} = useParams();
  let navigate = useNavigate();

  return(
    <div>
      <div>
        <Logo></Logo>
        <ProfileImage></ProfileImage>
      </div>

      <div className='background'>
        <div className={style.content}>
          <div className={style.leftDiv}>
            <img src="/" />
            <div className={style.bookTitle}>책 제목</div>
          </div>
          <div className={style.rightDiv}>
            <div className={style.wordlist}>단어장</div>
            <div className={style.startBtn} onClick={() => {navigate('/quiz/')}}>시작</div>
          </div>
        </div>
      </div>
    </div>
  )
}