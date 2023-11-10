import { useState } from "react"
import {AiOutlineSound} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'
import {showModal} from '../redux/showModal'

export default function WordlistModal() {
    let dispatch = useDispatch()
    let showModal = useSelector((state) => state.showModal.value);
    let [define, setDefine] = useState([]);

    return(
        <div>
            <div>
                <div onClick={(() => {dispatch(showModal())})}>닫기</div>
                <h2>단어</h2>
                <div><AiOutlineSound style={{cursor: 'pointer'}} onClick={() => {}} /></div>
            </div>

            {
                define.map((a,i) => {
                    return(
                        <div key={i}>
                            <h3>{i+1}. {a.definition}</h3>
                            <p>ex. {a.example}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}