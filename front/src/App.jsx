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

import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>      
        <Route path='/main' element={<Main></Main>}></Route>      
        <Route path='/mypage/:userid' element={<MyPage></MyPage>}></Route>
        <Route path='/register/profile' element={<Register></Register>}></Route>
        <Route path='/register/genre' element={<Genre/>}></Route>
        <Route path='/book/:bookid' element={<Book></Book>}></Route>
        <Route path='/quiz/:userid' element={<Quiz></Quiz>}></Route>
        <Route path='/wordlist/:userid' element={<Wordlist></Wordlist>}></Route>
        <Route path='/level-change/:userid' element={<LevelChange></LevelChange>}></Route>
      </Routes>
    </div>
  );
}

export default App;
