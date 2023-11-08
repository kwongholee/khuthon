import style from '../style/quizstart.module.css';
import Logo from '../components/Logo';
import ProfileImage from '../components/ProfileImage';

export default function QuizStart() {
  return(
    <div>
      <div>
        <Logo></Logo>
        <ProfileImage></ProfileImage>
      </div>

      <div className={style.background}>
        <div className={style.content}>
          <div>책 표지</div>
          <div className={style.bookTitle}>책 제목</div>
          <div className={style.wordlist}>단어장</div>
          <div className={style.startBtn}>시작</div>
        </div>
      </div>
    </div>
  )
}