import { useState } from "react"
import {AiOutlineSound} from 'react-icons/ai'

export default function WordModal() {
    let [define, setDefine] = useState([]);

    return(
        <div>
            <div>
                <h2>단어</h2>
                <div><AiOutlineSound style={{cursor: 'pointer'}} /></div>
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