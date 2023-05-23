import React,{useState,useEffect} from 'react'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios';
const Profile = () => {
    const id = useParams().id;
    const [user, setuser] = useState([]);
    useEffect(() => {
        const res=axios.get(`http://localhost:3700/api/user/${id}`).then((res)=>{
            setuser(res.data)
        });
    }, [])
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center m-12 '>
        <div className="flex flex-col justify-between  mr-6 ml-4 leading-normal max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name:{" "+user.name}</h5>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Email:{" "+user.email}</h2>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Admin:{user.isadmin?" "+"YES":" "+"NO"}</h2>
        
      {user.isadmin?<Link to={"/admin"}><button   type="button" className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-3">Go to Admin Panel</button></Link>:<button   type="button" className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-3">Get Admin Access</button>}
       
      
        </div>
        </div>

    </div>
  )
}

export default Profile