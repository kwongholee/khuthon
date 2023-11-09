import { useEffect } from "react"

export default function Word(props) {
    useEffect(() => {

    }, [])

    return(
        <div style={{width: '100%'}}>
            <div style={{borderRight: '#8C8C8C 2px solid', borderBottom: '#D3D3D3 1px solid'}}>{props.word.title}</div>
            <div style={{borderBottom: '#D3D3D3 1px solid'}}>{props.word.definition[0]}</div>
        </div>
    )
}