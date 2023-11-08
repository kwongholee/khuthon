import style from '../style/main.module.css';
import Background from '../components/Background';
import { useState } from 'react';
import axios from "axios"

export default function Main() {
  // let [id, setId] = useState("")
  // let [pw, setPw] = useState("")
  let [isLogged, setIsLogged] = useState(false)
  return(
    <div>
      {!isLogged ? <Start isLogged={isLogged} setIsLogged={setIsLogged}></Start> : <MainPage isLogged={isLogged} setIsLogged={setIsLogged}></MainPage>}
    </div>
  )
}

function Start(props) {
  return (
    <div>
    <Background></Background>
    <div>
      <div>
        Logo
        시작 문구!
      </div>
      <button onClick={() => {
        props.setIsLogged(true)
        axios.get('/login')
        .then((result) => {
            if (result.data) {
                console.log('성공')
            }
            else { 
                console.log('실패')
            }
        })
        .catch((err) => {
            console.log(err)
        })
        }}>Login</button>
    </div>
  </div>
  )
}
function MainPage(props) {
  return (
    <div>    
      <div>
        <button onClick={() => {
          props.setIsLogged(false)
          axios.post('/logout')
          .then((result) => {
              if (result.data) {
                  console.log('성공')
              }
              else { 
                  console.log('실패')
              }
          })
          .catch((err) => {
              console.log(err)
          })
          }}>Logout</button>
      </div>
    </div>
  )
}