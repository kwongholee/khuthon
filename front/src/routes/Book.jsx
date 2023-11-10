import React, { useState, useEffect } from 'react';
import style from '../style/book.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPosition } from '../redux/page';
import axios from 'axios';

function Book() {
  const [htmlContent, setHtmlContent] = useState('');
  // const [scrollPosition, setScrollPosition] = useState();
  let page = useSelector((state) => state.page);
  let currentPosition = page.currentPosition
  let userId = useSelector((state) => state.user.userId);
  let recentBook = useSelector((state) => state.recentBook);
  let bookId = recentBook.boodId

  let navigate = useNavigate()
  let dispatch = useDispatch()

  useEffect(() => {
    axios.get(`/mypage/${userId}`)
    .then(response => {
      const serverPosition = response.data.position
      dispatch(setPosition(serverPosition))
      console.log(currentPosition); // 서버에서 받은 데이터
    })
    .catch(error => {
      // 요청이 실패했을 때의 처리
      console.error('Error:', error);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, currentPosition)
    const fetchHTML = async () => {
      try {
        const response = await fetch('/bookHTML/korBooks/A_Study_in_Scarlet.html');
        const content = await response.text();
        setHtmlContent(content);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHTML();
  }, []);

  return (
    <div>
      <button className={style.cancel_button} onClick={() => {console.log(currentPosition)}}>취소</button>
      <button className={style.end_button}
        onClick={() => {
            let position = window.scrollY
            console.log(position)
            dispatch(setPosition(position))
            axios.put(`/mypage/${userId}`, {position : position})
              .then((res) => {
                console.log(position)
              })
              .catch((err) => {
                  console.log(err)
              })
            axios.get(`/book`)
            .then((res) => {
              navigate(`/mypage/${userId}`)
            })
            .catch((err) => {
                console.log(err)
            })
        }}>읽기 완료</button>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}

export default Book;
