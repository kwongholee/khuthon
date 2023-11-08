import style from '../style/main.module.css';
import Background from '../components/Background';

export default function Main() {
  return(
    <div>
      <Background></Background>
      
      <div>
        <div>
          Logo
          시작 문구!
        </div>
        <button>Login</button>
      </div>
    </div>
  )
}