import { useState, useEffect } from "react"
import {AiOutlineSound} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios"
import { closeModal } from "../redux/showModal";

export default function WordlistModal() {
    let [define, setDefine] = useState([{definition: 'def', example: 'exa'}]);
    let dispatch = useDispatch();

    return(
        <div>
            <div>
                <div style={{float: 'right', marginRight: '10px', cursor: 'pointer'}} onClick={() => {
                    dispatch(closeModal());
                }}>닫기</div>
                <h2 style={{textAlign: 'left', marginLeft: '20px'}}>단어</h2>
                <div><AiOutlineSound style={{cursor: 'pointer'}} /></div>
            </div>
            {
                define.map((a,i) => {
                    return(
                        <div key={i} style={{textAlign: 'left'}}>
                            <h3 style={{marginLeft: '20px'}}>{i+1}. {a.definition}</h3>
                            <p style={{marginLeft: '30px'}}>ex. {a.example}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}