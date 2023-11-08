import style from '../style/quiz.module.css';
import WordList from '../components/WordList';
import Logo from '../components/Logo';
import ProfileImage from '../components/ProfileImage';

export default function Quiz() {
  return(
    <div>
      <div>
        <Logo></Logo>
        <ProfileImage></ProfileImage>
      </div>

      <div style={{background: '#'}}>
        <div>왼쪽 화살표 이동</div>
        <WordList></WordList>
        <div>오른쪽 화살표 이동</div>
      </div>
    </div>
  )
}