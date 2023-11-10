import '../App.css'
import style from '../style/wordlist.module.css';
import Logo from '../components/Logo';
import ProfileImage from '../components/ProfileImage';
import Word from '../components/Word';
import { useEffect, useState } from 'react';
import {FaSearch} from 'react-icons/fa'
import LeftBtn from '../components/LeftBtn';
import RightBtn from '../components/RightBtn';
import WordlistModal from '../components/WordlistModal';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../redux/showModal';

export default function Wordlist() {
  let dispatch = useDispatch();
  let show = useSelector((state) => state.showModal.value)
  let {userid} = useParams();
  let [search, setSearch] = useState('');
  let [word, setWord] = useState([]);
  let [idx, setIdx] = useState(-1);

  useEffect(() => {
    setWord([1,2,3,4,5]);
  }, [])

  return(
    <div>
      <div>
        <Logo></Logo>
        <ProfileImage></ProfileImage>
      </div>

      <div className='background'>
        {1 == 0 ? <LeftBtn></LeftBtn> : null}
        {1 == 0 ? <RightBtn></RightBtn> : null}
        <div className={style.searchTable}>
          <input type="text" className={style.searchInput} onChange={(e) => {setSearch(e.target.value)}} />
          <div className={style.searchBtn}>
            <FaSearch size={30} />
          </div>
        </div>

        <div>
          <div className={style.wordTable}>
            <div className={style.wordTableTitleColumn} style={{width: '30%'}}>WORD</div>
            <div className={style.wordTableTitleColumn} style={{width: '70%'}}>MEANING</div>
            {
              word.map((a,i) => {
                return(
                  <div key={i} onClick={() => {setIdx(i); dispatch(openModal())}}>
                    <Word word={a}></Word>
                    {idx === i && show ? <WordlistModal></WordlistModal> : null}
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}