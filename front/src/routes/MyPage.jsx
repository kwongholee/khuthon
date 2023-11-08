import style from '../style/mypage.module.css';

export default function MyPage() {
  return(
    <div>
      <div>Logo</div>

      <div>
        <form action="/" method="post">
          <input name='name' type="text" />
          <select name="age">
            <option value="0">10세 이하</option>
            <option value="10">10대</option>
            <option value="20">20대</option>
            <option value="30">30대</option>
            <option value="40">40대</option>
            <option value="50">50대</option>
            <option value="60">60대</option>
            <option value="70">70대 이상</option>
          </select>
          <div>
            언어 선택란
            <div>한국어</div>
            <div>영어</div>
          </div>
        </form>
      </div>
    </div>
  )
}