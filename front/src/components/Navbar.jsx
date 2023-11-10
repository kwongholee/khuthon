import style from '../style/navbar.module.css'
import { useNavigate } from "react-router-dom"
import {useSelector} from 'react-redux'

export default function Navbar() {
    let navigate = useNavigate();
    let data = useSelector((state) => state.user.image)

    return(
        <div style={{backgroundColor: '#f2f2f2', display: 'flex'}}>
            <img className={style.logo} src='/logo.png' onClick={() => {navigate('/main')}} alt="logo" />
            <img className={style.profileImg} src={"/profile-" + data + '.png'} alt="profileImage" />
        </div>
    )
}