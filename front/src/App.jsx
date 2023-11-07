import './App.css';

import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<div></div>}></Route>
        <Route path='/mypage/:userid' element={<div></div>}></Route>
        <Route path='/book/:bookid' element={<div></div>}></Route>
        <Route path='/quiz/:userid' element={<div></div>}></Route>
        <Route path='/wordlist/:userid' element={<div></div>}></Route>
      </Routes>
    </div>
  );
}

export default App;
