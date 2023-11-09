import Logo from "../components/Logo"
import ProfileImage from "../components/ProfileImage"

export default function QuizDetail() {
    return(
        <div>
            <div>
                <Logo></Logo>
                <ProfileImage></ProfileImage>
            </div>

            <div>
                <div>
                    <div>왼쪽 화살표 btn</div>
                </div>

                <div>
                    <div>book title</div>
                    <div>quiz</div>
                    <div>answer</div>
                    <div>달성률</div>
                </div>

                <div>
                    <div>날짜</div>
                    <div>오른쪽 화살표 버튼</div>
                    <div>완료</div>
                </div>
            </div>
        </div>
    )
}