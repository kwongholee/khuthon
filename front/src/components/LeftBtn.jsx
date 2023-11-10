import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom';
import style from '../style/arrow.module.css'

export default function LeftBtn() {
    let navigate = useNavigate();

    return(
        <div>
            <BsFillArrowLeftCircleFill className={style.left_icon} onClick={() => {navigate()}} />
        </div>
    )
}