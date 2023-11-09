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
          <div>book title</div>
          <div>quiz result</div>
        </div>

        <div>
          <p>날짜</p>
          <div>완료</div>
        </div>
      </div>
    </div>
  )
}