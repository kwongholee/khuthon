import { useNavigate } from "react-router-dom"

export default function Navbar() {
    let navigate = useNavigate();

    return(
        <div>
            <img style={{width:'248px', height:'145px'}} src='/logo.png' onClick={() => {navigate('/main')}} alt="logo" />
            <img src="/" alt="profileImage" />
        </div>
    )
}