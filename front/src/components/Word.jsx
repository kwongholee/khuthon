import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {pushWord, deleteWord} from '../redux/makeQuiz'
import {openModal} from '../redux/showModal'
import {AiOutlineCheckSquare, AiFillCheckSquare} from 'react-icons/ai'
import axios from 'axios';
import { useSearchParams } from "react-router-dom"

export default function Word(props) {
    let [isCheck, setCheck] = useState(false);
    let dispatch = useDispatch();
    let [define, setDefine] = useState([]);
    let parser = new DOMParser();

    const fetch = async () => {
        let data = await axios.get('https://krdict.korean.go.kr/api/search?key=84C4A55498149C96AC09E05BEC597B13&q=' + props.word);
        let xmlDoc = parser.parseFromString(data, 'text/xml');
        let arr = [];
        let channel = xmlDoc.querySelector('channel')
        console.log(channel);
        let items = xmlDoc.querySelectorAll('item');
        console.log(items);
        items.forEach((a) => {
            const sense = a.querySelector('sense');
            console.log(sense)
            const definition = sense.querySelector('definition');
            console.log(definition)
            arr.push(definition);
        })
        setDefine(arr);
    }

    useEffect(() => {
        fetch();
    }, [])

    return(
        <div>
            <div style={{width: '100%', height: '30px'}}>
                <div style={{borderLeft: '#D3D3D3 1px solid', borderRight: '#8C8C8C 2px solid', borderBottom: '#D3D3D3 1px solid', width: '30%', float: 'left'}}>
                    {isCheck ? <AiFillCheckSquare style={{cursor: 'pointer'}} onClick={() => {setCheck(false); dispatch(deleteWord(props.word))}}></AiFillCheckSquare>
                    :<AiOutlineCheckSquare style={{cursor: 'pointer'}} onClick={() => {setCheck(true); dispatch(pushWord(props.word))}}></AiOutlineCheckSquare>}
                    {props.word}
                </div>
                <div style={{borderBottom: '#D3D3D3 1px solid', borderRight: '#D3D3D3 1px solid', width: '69.6%', float: 'right', cursor: 'pointer'}} onClick={() => {
                    dispatch(openModal())                    
                }}>{define[0]}</div>
            </div>
        </div>
    )
}