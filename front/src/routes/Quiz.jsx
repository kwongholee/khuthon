import style from '../style/quiz.module.css';
import WordList from '../components/WordList';
import Logo from '../components/Logo';
import ProfileImage from '../components/ProfileImage';
import LeftBtn from '../components/LeftBtn';
import RightBtn from '../components/RightBtn';

export default function Quiz() {
  return(
    <div>
      <div>
        <Logo></Logo>
        <ProfileImage></ProfileImage>
      </div>

      <div className={style.background}>
        <LeftBtn></LeftBtn>
        <WordList></WordList>
        <RightBtn></RightBtn>
      </div>
    </div>
  )
}