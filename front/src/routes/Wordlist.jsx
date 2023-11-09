import style from '../style/wordlist.module.css';
import Logo from '../components/Logo';
import ProfileImage from '../components/ProfileImage';
import Word from '../components/Word';
import { useState } from 'react';
import {FaSearch} from 'react-icons/fa'
import LeftBtn from '../components/LeftBtn';
import RightBtn from '../components/RightBtn';
import WordlistModal from '../components/WordlistModal';

export default function Wordlist() {
  let [word, setWord] = useState([]);
  let [idx, setIdx] = useState(0);

  return(
    <div>
      <div>
        <Logo></Logo>
        <ProfileImage></ProfileImage>
      </div>

      <div className='background'>
        {1 == 0 ? <LeftBtn></LeftBtn> : null}
        {1 == 0 ? <RightBtn></RightBtn> : null}
        <div style={{margin: 'auto'}}>
          <input type="text" className={style.searchInput} />
          <div className={style.searchBtn}>
            <FaSearch size={20} />
          </div>
        </div>

        <div>
          <div className={style.wordTable}>
            <div className={style.wordTableTitleColumn}>WORD</div>
            <div className={style.wordTableTitleColumn}>MEANING</div>
          </div>
          {
            word.map((a,i) => {
              return(
                <div>
                  <Word onClick={() => {setIdx(i)}} word={a} key={i}></Word>
                  {idx === i ? <WordlistModal></WordlistModal> : null}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}