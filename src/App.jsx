import './App.css';
import{BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './Screens/HomeScreen';
import Bookingscreen from './Screens/Bookingscreen';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
function App() {
    return ( 
        <BrowserRouter>
        <div className="app">
       <Routes>
       <Route path="/" element={<Home/>} />
   <Route path="/bookingroom/:id/:fromdate/:todate" element={<Bookingscreen/>} />
   <Route path="/register" element={<Signup/>} />
   <Route path="/login" element={<Login/>} />
         </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;