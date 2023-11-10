import '../App.css'
import style from '../style/quizdetail.module.css'
import Navbar from '../components/Navbar';
import LeftBtn from '../components/LeftBtn';
import RightBtn from '../components/RightBtn';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { answer } from '../redux/submitAnswer';
import { useState } from 'react';
import { checkAnswer } from '../redux/answer';

export default function QuizDetail() {
    let dispatch = useDispatch();
    let realanswer = useSelector((state) => state.answer.answer)
    let rightCnt = useSelector((state) => state.answer.cnt)
    let quiz = useSelector((state) => state.quiz.quiz);
    let submitanswer = useSelector((state) => state.submitAnswer.submitAnswer)
    let [value, setValue] = useState("");
    let [searchParams, setSearchParams] = useSearchParams();

    return(
        <div>
            <Navbar></Navbar>

            <div className='background'>
                <div>
                    <div className={style.date}>날짜</div>
                    <div className={style.bookTitle}>book title</div>
                </div>

                <div>
                    {1 == 0 ? <LeftBtn></LeftBtn> : null}
                    <div className={style.box}>
                        <h3 style={{textAlign: 'center'}}>다음 빈칸에 들어갈 말은?</h3>
                        {quiz[parseInt(searchParams.get("page"))-1]}
                    </div>
                    <div className={style.box}>
                        <h3 style={{textAlign:'center'}}>answer</h3>
                        <input type="text" onChange={(e) => {setValue(e.target.value)}} />
                        <button onClick={() => {dispatch(answer(value))}}>해당 문제의 답 제출</button>
                    </div>
                    {1 == 0 ? <RightBtn></RightBtn> : null}
                </div>
                <div>
                    {parseInt(searchParams.get("page")) === realanswer.length ? <div className={style.completeBtn} onClick={async () => {
                        await dispatch(checkAnswer(submitanswer));
                        console.log(rightCnt, realanswer);
                        axios.post('/quiz/result',  {rightNum: rightCnt, totalNum: parseInt(searchParams.get("page")), result: realanswer}).then(() => {console.log('success')})
                    }}>완료</div> : null}
                    <div className={style.pagebar}>{parseInt(searchParams.get("page"))} / {realanswer.length}</div>
                </div>
            </div>
        </div>
    )
}