import style from '../style/wordlist.module.css';
import Logo from '../components/Logo';
import ProfileImage from '../components/ProfileImage';

export default function Wordlist() {
  return(
    <div>
      <div>
        <Logo></Logo>
        <ProfileImage></ProfileImage>
      </div>

      <div>
        <div>
          검색창
        </div>

        <div>
          단어장
        </div>
      </div>
    </div>
  )
}