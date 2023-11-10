import { useEffect, useState } from 'react'
import style from '../style/quiz.module.css'

export default function WordList(props) {
  let [left, setLeft] = useState([]);
  let [right, setRight] = useState([]);
  if(props.data.wordList.legth > 0 && props.data.wordList.length <= 5) {
    let copy = [];
    for(let i = 0; i < props.data.wordList.length; i++) {
      copy.push(props.data.wordList[i]);
    }
    setLeft(copy);
  }
  else {
    let copy = [];
    for(let i = 0; i < 5; i++) {
      copy.push(props.data.wordList[i]);
    }
    setLeft(copy);
    let copy2 = [];
    for(let i = 5; i < props.data.wordList.length; i++) {
      copy2.push(props.data.wordList[i]);
    }
    setRight(copy2);
  }

  return(
    <div>
      <div className={style.wordlistBackground}>
        <div className={style.bookTitle}>
          <h3>{props.data.title}</h3>
        </div>
        <div className={style.backgroundColor}>
          <div className={style.leftWordlist}>
            <ul>
              {
                props.data.wordList.length >= 1 ? left.map((a,i) => {
                  return(
                    <li key={i}>{a}</li>
                  )
                }) : null
              }
            </ul>
          </div>
          <div className={style.rightWordlist}>
            <ul>
            {
                props.data.wordList.length >= 6 ? right.map((a,i) => {
                  return(
                    <li key={i}>{a}</li>
                  )
                }) : null
              }
            </ul>
          </div>
        </div>
        <div style={{width: '100%', textAlign: 'center', fontSize: '14px', marginBottom: '10px'}}>{props.data.date}</div>
      </div>
    </div>
  )
}