import './App.css';
import Login from './routes/Login';
import Main from './routes/Main';
import MyPage from './routes/MyPage';
import Book from './routes/Book';
import Quiz from './routes/Quiz';
import Wordlist from './routes/Wordlist';
import LevelChange from './routes/LevelChange';
import Register from './routes/Register';
import Genre from './routes/Genre';
import QuizDetail from './routes/QuizDetail';
import QuizStart from './routes/QuizStart';
import QuizResult from './routes/QuizResult';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>      
        <Route path='/mainpage/:userid' element={<Main></Main>}></Route>      
        <Route path='/mypage/:userid' element={<MyPage></MyPage>}></Route>
        <Route path='/mypage/' element={<MyPage></MyPage>}></Route>
        <Route path='/register/profile/:userid' element={<Register></Register>}></Route>
        <Route path='/register/genre/:userid' element={<Genre/>}></Route>
        <Route path='/book/:bookid' element={<Book></Book>}></Route>
        <Route path='/quiz' element={<Quiz></Quiz>}></Route>
        <Route path='/quiz/:userid' element={<QuizDetail></QuizDetail>}></Route>
        <Route path='/quiz/:userid/:bookid' element={<QuizStart></QuizStart>}></Route>
        <Route path='/quiz/result/:quizid' element={<QuizResult></QuizResult>}></Route>
        <Route path='/wordlist/:userid' element={<Wordlist></Wordlist>}></Route>
        <Route path='/level-change/:userid' element={<LevelChange></LevelChange>}></Route>
      </Routes>
    </div>
  );
}

export default App;
