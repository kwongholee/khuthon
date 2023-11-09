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
          <input type="text" />
          <div>검색 버튼</div>
        </div>

        <div>
          <div>
            word
            meaning
          </div>
          <div>
            
          </div> 
        </div>
      </div>
    </div>
  )
}