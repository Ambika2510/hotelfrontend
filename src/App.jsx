import './App.css';
import{BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './Screens/HomeScreen';
import Bookingscreen from './Screens/Bookingscreen';
function App() {
    return ( 
        <BrowserRouter>
        <div className="app">
       <Routes>
       <Route path="/" element={<Home/>} />
   <Route path="/bookingroom/:id" element={<Bookingscreen/>} />
         </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;