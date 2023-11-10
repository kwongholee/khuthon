import '../App.css'
import style from '../style/arrow.module.css'
import WordList from '../components/WordList';
import Navbar from '../components/Navbar';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

export default function Quiz() {
  let [searchParams, setSearchParams] = useSearchParams();
  let userid = useSelector((state) => state.user.userId);
  let [quiz, setQuiz] = useState([]);

  const fetch = async () => {
    let data =  await axios.get('/quiz/' + userid + "?page=" + searchParams.get("page"))
    setQuiz(data);
  }

  useEffect(() => {
    fetch();
  }, [])

  return(
    <div>
      <Navbar></Navbar>

      <div className='background'>
        <BsFillArrowLeftCircleFill className={style.left_icon} onClick={() => {setSearchParams("page", parseInt(searchParams.get("page"))-1)}} />
        {
          quiz.map((a,i) => {
            return(
              <div key={i}><WordList data={a}></WordList></div>
            )
          })
        }
        <BsFillArrowRightCircleFill className={style.right_icon} onClick={() => {setSearchParams("page", parseInt(searchParams.get("page"))+1)}} />
      </div>
    </div>
  )
}