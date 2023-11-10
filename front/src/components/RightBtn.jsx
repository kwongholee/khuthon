import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom';
import style from '../style/arrow.module.css'

export default function RightBtn() {
    let navigate = useNavigate();

    return(
        <div>
            <BsFillArrowRightCircleFill className={style.right_icon} onClick={() => {navigate()}} />
        </div>
    )
}