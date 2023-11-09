import style from '../style/quizresult.module.css';
import Logo from '../components/Logo';
import ProfileImage from '../components/ProfileImage';

export default function QuizResult() {
  return(
    <div>
      <div>
        <Logo></Logo>
        <ProfileImage></ProfileImage>
      </div>

      <div>
        <div>
          <div className={style.bookTitle}>book title</div>
          <div>날짜</div>
        </div>

        <div>
          <div className={style.box}>
            <div>
              <img src="" alt="책표지" />
              <h3>책 제목</h3>
            </div>

            <div>
              <ol>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
              </ol>
            </div>

            <div>
              <img src="" alt="맞춘개수에따른표정" />
              <h4>맞춘 개수</h4>
            </div>
          </div>
        </div>

        <div>
          <div className={style.completeBtn}>완료</div>
        </div>
      </div>
    </div>
  )
}