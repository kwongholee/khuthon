import style from '../style/quizdetail.module.css'
import Logo from "../components/Logo"
import ProfileImage from "../components/ProfileImage"

export default function QuizDetail() {
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
                    <div>왼쪽 화살표 btn</div>
                    <div className={style.box}>quiz</div>
                    <div className={style.box}>answer</div>
                    <div>오른쪽 화살표 버튼</div>
                </div>

                <div> 
                    <div className={style.pagebar}>달성률</div>
                    <div className={style.completeBtn}>완료</div>
                </div>
            </div>
        </div>
    )
}