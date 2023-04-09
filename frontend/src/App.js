import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Loading from './components/Loading';

function App() {
  return (
    <div className='h-[200vw] bg-[#EFEFEA]'>
      <Loading/>
      <Navbar/>
      <Home/>
    </div>
  );
}

export default App;
