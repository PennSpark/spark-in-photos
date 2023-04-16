import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
// import fetchByWeek from './upload';
import { useEffect } from 'react';

function App() {



  return (
    <div className='bg-[#EFEFEA] big-div'>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
