import style from '../style/main.module.css'

export default function Background() {
  return(
    <div className={style.background} style={{backgroundImage: 'url(background.jpg)'}}></div>
  )
}