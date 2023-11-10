import '../App.css'
import style from '../style/quizdetail.module.css'
import Logo from "../components/Logo"
import ProfileImage from "../components/ProfileImage"
import LeftBtn from '../components/LeftBtn';
import RightBtn from '../components/RightBtn';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

export default function QuizDetail() {
    return(
        <div>
            <div>
                <Logo></Logo>
                <ProfileImage></ProfileImage>
            </div>

            <div className='background'>
                <div>
                    <div className={style.date}>날짜</div>
                    <div className={style.bookTitle}>book title</div>
                </div>

                <div>
                    {1 == 0 ? <LeftBtn></LeftBtn> : null}
                    <div className={style.box}>quiz</div>
                    <div className={style.box}>answer</div>
                    {1 == 0 ? <RightBtn></RightBtn> : null}
                </div>
                <div>
                    <div className={style.completeBtn} onClick={() => {
                        axios.put('/quiz/result/:quizid').then(() => {console.log('success')})
                    }}>완료</div>
                    <div className={style.pagebar}>달성률</div>
                </div>
            </div>
        </div>
    )
}