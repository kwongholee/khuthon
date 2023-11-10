import '../App.css'
import style from '../style/quizresult.module.css';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

export default function QuizResult() {
  let {quizid} = useParams();

  return(
    <div>
      <Navbar></Navbar>

      <div className='background'>
        <div>
          <div className={style.date}>날짜</div>  
          <div className={style.bookTitle}>book title</div>
        </div>

        <div className={style.box}>
          <div style={{width: '30%', float: 'left'}}>
            <img src="" alt="책표지" />
            <h3>책 제목</h3>
          </div>

          <div style={{width: '20%', float: 'left'}}>
            <ol>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
            </ol>
          </div>

          <div style={{width: '50%', float: 'left'}}>
            <img src="" alt="맞춘개수에따른표정" />
            <h4>맞춘 개수</h4>
          </div>
        </div>
        <div className={style.completeBtn}>완료</div>
      </div>
    </div>
  )
}