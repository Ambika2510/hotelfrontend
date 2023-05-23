import './App.css';
import{BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './Screens/HomeScreen';
import Bookingscreen from './Screens/Bookingscreen';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import Profile from './Screens/Profile';
import Userbooking from './Screens/Userbooking';
import Adminscreen from './Screens/Adminscreen';
function App() {
    return ( 
        <BrowserRouter>
        <div className="app">
       <Routes>
       <Route path="/" element={<Home/>} />
   <Route path="/bookingroom/:id/:fromdate/:todate" element={<Bookingscreen/>} />
   <Route path="/register" element={<Signup/>} />
   <Route path="/login" element={<Login/>} />
   <Route path="/profile/:id" element={<Profile/>} />
   <Route path="/booking/:id" element={<Userbooking/>} />
   <Route path='/admin' element={<Adminscreen/>}/>
         </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;