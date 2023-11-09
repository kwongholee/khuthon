import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom';

export default function LeftBtn() {
    let navigate = useNavigate();

    return(
        <div>
            <BsFillArrowLeftCircleFill style={{cursor: 'pointer'}} onClick={() => {navigate()}} />
        </div>
    )
}