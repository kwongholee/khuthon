import './App.css';
import Main from './routes/Main';
import MyPage from './routes/MyPage';
import Book from './routes/Book';
import Quiz from './routes/Quiz';
import Wordlist from './routes/Wordlist';
import LevelChange from './routes/LevelChange';
import Register from './routes/Register';
import QuizDetail from './routes/QuizDetail';
import QuizStart from './routes/QuizStart';
import QuizResult from './routes/QuizResult';

import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/mypage/:userid' element={<MyPage></MyPage>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/book/:bookid' element={<Book></Book>}></Route>
        <Route path='/quiz/:userid' element={<QuizDetail></QuizDetail>}></Route>
        <Route path='/quiz/:userid/:bookid' element={<QuizStart></QuizStart>}></Route>
        <Route path='/wordlist/:userid' element={<Wordlist></Wordlist>}></Route>
        <Route path='/level-change/:userid' element={<LevelChange></LevelChange>}></Route>
      </Routes>
    </div>
  );
}

export default App;
