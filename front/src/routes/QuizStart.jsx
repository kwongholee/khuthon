import style from '../style/quizstart.module.css';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getAnswer } from '../redux/answer';
import { getQuiz } from '../redux/quiz';
import { useEffect, useState } from 'react';

export default function QuizStart() {
  let {bookid} = useParams();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let userid = useSelector((state) => state.user.userId)
  let word = useSelector((state) => state.word.word)
  let [title, setTitle] = useState("");
  let [img, setImg] = useState("");

  const fetch = async (data) => {
    return await axios('/quiz/' + bookid);
  }

  useEffect(() => {
    setTitle(fetch.title);
    setImg(fetch.bookImage);
  })

  return(
    <div>
      <Navbar></Navbar>
      <div className='background'>
        <div className={style.content}>
          <div className={style.leftDiv}>
            <img src={img} alt='책표지' />
            <div className={style.bookTitle}>{title}</div>
          </div>
          <div className={style.rightDiv}>
            <div className={style.wordlist}>
              <ul>
                {word.map((a,i) => {
                  return(
                    <li key={i}>{a}</li>
                  )
                })}
              </ul>
            </div>
            <div className={style.startBtn} onClick={async () => {
              const response = await axios.post('/quiz/word/'+userid, {userId: userid, word, bookId: bookid});
              await dispatch(getAnswer(response.answer));
              await dispatch(getQuiz(response.quiz));
              navigate('/quiz/detail?page=1')
            }}>시작</div>
          </div>
        </div>
      </div>
    </div>
  )
}