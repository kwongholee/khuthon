import style from '../style/quizdetail.module.css'
import Logo from "../components/Logo"
import ProfileImage from "../components/ProfileImage"
import LeftBtn from '../components/LeftBtn';
import RightBtn from '../components/RightBtn';
import {useParams} from 'react-router-dom';

export default function QuizDetail() {
    let {userid} = useParams();

    return(
        <div>
            <div>
                <Logo></Logo>
                <ProfileImage></ProfileImage>
            </div>

            <div>
                <div>
                    <div className={style.bookTitle}>book title</div>
                    <div>날짜</div>
                </div>

                <div>
                    {1 == 0 ? <LeftBtn></LeftBtn> : null}
                    <div className={style.box}>quiz</div>
                    <div className={style.box}>answer</div>
                    {1 == 0 ? <RightBtn></RightBtn> : null}
                </div>

                <div> 
                    <div className={style.pagebar}>달성률</div>
                    <div className={style.completeBtn}>완료</div>
                </div>
            </div>
        </div>
    )
}