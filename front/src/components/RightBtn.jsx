import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom';

export default function RightBtn() {
    let navigate = useNavigate();

    return(
        <div>
            <BsFillArrowRightCircleFill style={{cursor: 'pointer'}} onClick={() => {navigate()}} />
        </div>
    )
}