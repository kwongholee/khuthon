import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {pushWord, deleteWord} from '../redux/makeQuiz'
import {openModal} from '../redux/showModal'
import {AiOutlineCheckSquare, AiFillCheckSquare} from 'react-icons/ai'

export default function Word(props) {
    let [isCheck, setCheck] = useState(false);
    let [idx, setIdx] = useState(-1);
    let dispatch = useDispatch();

    return(
        <div>
            <div style={{width: '100%', height: '10px'}}>
                <div style={{borderLeft: '#D3D3D3 1px solid', borderRight: '#8C8C8C 2px solid', borderBottom: '#D3D3D3 1px solid', width: '30%', float: 'left'}}>
                    {isCheck ? <AiFillCheckSquare style={{cursor: 'pointer'}} onClick={() => {setCheck(false); dispatch(deleteWord(props.word))}}></AiFillCheckSquare>
                    :<AiOutlineCheckSquare style={{cursor: 'pointer'}} onClick={() => {setCheck(true); dispatch(pushWord(props.word))}}></AiOutlineCheckSquare>}
                    {props.word}
                </div>
                <div style={{borderBottom: '#D3D3D3 1px solid', borderRight: '#D3D3D3 1px solid', width: '69.6%', float: 'right', cursor: 'pointer'}} onClick={() => {
                    dispatch(openModal())                    
                }}>{props.word}</div>
            </div>
        </div>
    )
}