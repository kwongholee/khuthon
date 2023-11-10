import style from '../style/mypage.module.css';

export default function MyPage() {
  return(
      <div className={style.background}> 
        <div id='위에 div' className={style.first_container}>
          <div className={style.profile}></div>
        </div>
      </div>
  )
}