import style from '../style/quiz.module.css'

export default function WordList() {
  return(
    <div>
      <div className={style.wordlistBackground}>
        <div className={style.bookTitle}>
          <h3>글제목</h3>
        </div>
        <div className={style.backgroundColor}>
          <div className={style.leftWordlist}>
            <ul>
              <li>a</li>
              <li>a</li>
              <li>a</li>
              <li>a</li>
              <li>a</li>
            </ul>
          </div>

          <div className={style.rightWordlist}>
            <ul>
              <li>a</li>
              <li>a</li>
              <li>a</li>
              <li>a</li>
              <li>a</li>
            </ul>
          </div>
        <p style={{float: 'right'}}>날짜</p>
        </div>
      </div>
    </div>
  )
}