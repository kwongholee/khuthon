import '../App.css'
import WordList from '../components/WordList';
import Navbar from '../components/Navbar';
import LeftBtn from '../components/LeftBtn';
import RightBtn from '../components/RightBtn';

export default function Quiz() {
  return(
    <div>
      <Navbar></Navbar>

      <div className='background'>
        {1 == 0 ? <LeftBtn></LeftBtn> : null}
        <WordList></WordList>
        <WordList></WordList>
        <WordList></WordList>
        <WordList></WordList>
        {1 == 0 ? <RightBtn></RightBtn> : null}
      </div>
    </div>
  )
}