import style from '../style/levelchange.module.css';
import {useParams} from 'react-router-dom';

export default function LevelChange() {
    let {userid} = useParams();

    return(
        <div>
            <div className={style.bookTitle}>
                <h2>책제목</h2>
            </div>

            <div className={style.levelStatus}>
                <img src="/level-1.png" style={{margin: 'auto', display: 'block'}}></img>
                <div className={style.status}>
                    <p>리딩 평균 속도: 0.00</p>
                    <p>맞힌 퀴즈의 개수: 0</p>
                </div>
                <h3 className={style.readingLevel}>당신의 리딩레벨은 0입니다!</h3>
            </div>

            <div className={style.mypageBtn}>마이페이지로 이동하기</div>
        </div>
    )
}