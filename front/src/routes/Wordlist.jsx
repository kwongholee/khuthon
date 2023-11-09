import style from '../style/wordlist.module.css';
import Logo from '../components/Logo';
import ProfileImage from '../components/ProfileImage';
import Word from '../components/Word';
import { useState } from 'react';
import {FaSearch} from 'react-icons/fa'

export default function Wordlist() {
  let [word, setWord] = useState([]);

  return(
    <div>
      <div>
        <Logo></Logo>
        <ProfileImage></ProfileImage>
      </div>

      <div>
        <div style={{margin: 'auto'}}>
          <input type="text" className={style.searchInput} />
          <div className={style.searchBtn}>
            <FaSearch size={20} />
          </div>
        </div>

        <div>
          <div className={style.wordTable}>
            word
            meaning
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