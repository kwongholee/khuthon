import { useNavigate } from "react-router-dom"

export default function Logo() {
  let navigate = useNavigate();

  return(
    <div><img style={{width:'248px', height:'145px'}} src='/logo.png' onClick={() => {navigate('/main')}}></img></div>
  )
}