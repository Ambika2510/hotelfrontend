import './App.css';
import{BrowserRouter,Routes, Route,Navigate} from 'react-router-dom';
import Home from './Screens/HomeScreen';
import Bookingscreen from './Screens/Bookingscreen';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import Profile from './Screens/Profile';
import Userbooking from './Screens/Userbooking';
import Adminscreen from './Screens/Adminscreen';
import Landscreen from './Screens/Landscreen';
import Updatepassword from './Screens/Updatepassword';

function App() {
    let user=null;
    if(localStorage.getItem("user")){
        user=localStorage.getItem("user");
    }
    return ( 
        <BrowserRouter>
        <div className="app">
       <Routes>
        <Route path="/" element={<Landscreen/>} />
       <Route path="/home" element={<Home/>} />
   <Route path="/bookingroom/:id/:fromdate/:todate" element={<Bookingscreen/>} />
   <Route path="/register"  element={!user? <Signup /> : <Navigate to="/" />}  />
   <Route path="/login" element={!user? <Login /> : <Navigate to="/" />}  />
   <Route path="/profile/:id" element={user?<Profile/>:<Navigate to="/"/>} />
   <Route path="/booking/:id" element={<Userbooking/>} />
   <Route path='/admin' element={user?<Adminscreen/>:<Navigate to="/"/>}/>
   <Route path="/updatepassword/:uid" element={<Updatepassword/>}/>
         </Routes>
    
        </div>
        </BrowserRouter>
    );
}

export default App;