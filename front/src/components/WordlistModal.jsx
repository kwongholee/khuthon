import { useState, useEffect } from "react"
import {AiOutlineSound} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios"
import { closeModal } from "../redux/showModal";

export default function WordlistModal(props) {
    let [define, setDefine] = useState([]);
    let dispatch = useDispatch();
    let parser = new DOMParser();
    
    const fetch = async () => {
        let data = await axios.get('https://krdict.korean.go.kr/api/search?key=84C4A55498149C96AC09E05BEC597B13&q=' + props.word);
        let xmlDoc = parser.parseFromString(data, 'text/xml');
        let arr = [];
        let items = xmlDoc.querySelectorAll('item');
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
    })

    return(
        <div>
            <div style={{borderRight: '#D3D3D3 1px solid', borderLeft: "#D3D3D3 1px solid"}}>
                <div style={{float: 'right', marginRight: '10px', cursor: 'pointer'}} onClick={() => {
                    dispatch(closeModal());
                }}>닫기</div>
                <h2 style={{textAlign: 'left', marginLeft: '20px'}}>{props.word}</h2>
                <div><AiOutlineSound style={{cursor: 'pointer'}} /></div>
                <hr />
            </div>
            {
                define.map((a,i) => {
                    return(
                        <div key={i} style={{textAlign: 'left', borderRight: '#D3D3D3 1px solid', borderLeft: "#D3D3D3 1px solid"}}>
                            <h3 style={{marginLeft: '20px'}}>{i+1}. {a}</h3>
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}