import style from '../style/wordlist.module.css';
import Logo from '../components/Logo';
import ProfileImage from '../components/ProfileImage';
import Word from '../components/Word';
import { useState } from 'react';
import {FaSearch} from 'react-icons/fa'
import LeftBtn from '../components/LeftBtn';
import RightBtn from '../components/RightBtn';

export default function Wordlist() {
  let [word, setWord] = useState([]);

  return(
    <div>
      <div>
        <Logo></Logo>
        <ProfileImage></ProfileImage>
      </div>

      {1 == 0 ? <LeftBtn></LeftBtn> : null}
      {1 == 0 ? <RightBtn></RightBtn> : null}

      <div>
        <div style={{margin: 'auto'}}>
          <input type="text" className={style.searchInput} />
          <div className={style.searchBtn}>
            <FaSearch size={20} />
          </div>
        </div>

        <div>
          <div className={style.wordTable}>
            <div>WORD</div>
            <div>MEANING</div>
          </div>
          {
            word.map((a,i) => {
              return(
                <Word word={a} key={i}></Word>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}