import '../App.css'
import style from '../style/wordlist.module.css';
import Navbar from '../components/Navbar';
import Word from '../components/Word';
import { useEffect, useState } from 'react';
import LeftBtn from '../components/LeftBtn';
import RightBtn from '../components/RightBtn';
import WordlistModal from '../components/WordlistModal';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function Wordlist() {
  let {userid} = useParams();
  let [word, setWord] = useState([]);
  let [idx, setIdx] = useState(-1);
  let data = useSelector((state) => state.word.word)
  let show = useSelector((state) => state.show.show)
  let [searchParams, setSearchParams] = useSearchParams();
    const fetch = async () => {
        return await axios.get('/wordlist/' + userid + "?page=" + searchParams.get("page"));
    }

    useEffect(() => {
        let copy = [...fetch.wordList];
        setWord(copy);
    })

  return(
    <div>
      <Navbar></Navbar>

      <div className='background'>
        {1 === 0 ? <LeftBtn></LeftBtn> : null}
        {1 === 0 ? <RightBtn></RightBtn> : null}
        <div className={style.submitBtn} onClick={() => {console.log(data)}}>제출</div>
        <div>
          <div className={style.wordTable}>
            <div style={{display: 'flex'}}>
              <div className={style.wordTableTitleColumn} style={{width: '30%', borderRight: '#8C8C8C 2px solid', borderLeft: '#D3D3D3 1px solid'}}>WORD</div>
              <div className={style.wordTableTitleColumn} style={{width: '69.6%', borderRight: '#D3D3D3 1px solid'}}>MEANING</div>
            </div>
            {
              word.map((a,i) => {
                return(
                  <div key={i} onClick={() => {setIdx(i);}}>
                    <Word word={a}></Word>
                    {idx === i && show ? <WordlistModal word={a}></WordlistModal> : null}
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