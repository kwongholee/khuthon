import '../App.css'
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

      <div className='background'>
        {1 == 0 ? <LeftBtn></LeftBtn> : null}
        <WordList></WordList>
        {1 == 0 ? <RightBtn></RightBtn> : null}
      </div>
    </div>
  )
}