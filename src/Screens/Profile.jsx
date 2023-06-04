import React,{useState,useEffect,useRef} from 'react'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {storage} from '../Firebase'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {v4} from "uuid"
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Profile = () => {
    const id = useParams().id;
    const [filename,setfilename]=useState(null);
    const inputref=useRef(null);
    const [user, setuser] = useState([]);
    if(!localStorage.getItem("user")){
      window.location.href="/home"
  
  }
  else if(localStorage.getItem("user")){
    const data=JSON.parse(localStorage.getItem("user"))
    if(data.id!==id){
      localStorage.removeItem("user")
      window.location.href="/home"
    }
  }
    useEffect(() => {
      const data=JSON.parse(localStorage.getItem("user"))
      const config={	
        headers: {
        'authorization': `Bearer ${data.token}`
    }}
        const res=axios.get(`https://hotel-backend0987.onrender.com/api/user/${id}`,config).then((res)=>{
            setuser(res.data)
        });
    }, [])
    const handlesubmit=async(e)=>{
 
      e.preventDefault();
      if(localStorage.getItem("user")){
        const datax=JSON.parse(localStorage.getItem('user'));
        const config={	
          headers: {
          'authorization': `Bearer ${datax.token}`
      }}
      if(filename===null){
        toast.error("image will not be uploaded",{position:"top-center",autoClose:8000})
        return}
      else{
        toast.success("Wait..Update Under processing!!",{position:"top-center",autoClose:20000})
        const imagerf=ref(storage,`hotelimages/${filename.name+v4()}`);
        uploadBytes(imagerf,filename).then((snapshot)=>{
         getDownloadURL(snapshot.ref).then((url)=>{
            const datar={
              url
            }
           axios.patch("http://localhost:3700/api/updateprofilepic/"+id,datar,config).then((res)=>{
              if(res.status===200){
                setfilename(null);
                inputref.current.value = null;
                window.location.href="/home";
                console.log("updateprofile success")
              }
            }).catch((err)=>{
              toast.error("update failed",{position:"top-center",autoClose:8000})
         })
        })
        })
  
      }}
    else{
      toast.error("Login to continue",{position:"top-center",autoClose:8000})
      window.location.href="/login";
    }}
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center m-12 '>
        <div className="flex flex-col justify-between  mr-6 ml-4 leading-normal max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name:{" "+user.name}</h5>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Email:{" "+user.email}</h2>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Admin:{user.isadmin?" "+"YES":" "+"NO"}</h2>
      
        
      {user.isadmin?<Link to={"/admin"}><button   type="button" className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-3">Go to Admin Panel</button></Link>:<Link to="https://docs.google.com/forms/d/e/1FAIpQLSeoLVFi6JWQ9wPeWH2XeV4Fn1o9AVs9_moAG2YYvBYF98M1gw/viewform?usp=sf_link"><button   type="button" className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-3">Get Admin Access</button></Link>}
      <div className="flex justify-center content-center">
    <div className=" p-6  m-1  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
<form onSubmit={handlesubmit}>
  

 
  <div className="mb-6">
  <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white" for="file_input">Upload Profile image :</label>
<input class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"   accept="image/png, image/jpg, image/jpeg" onChange={(e)=>setfilename(e.target.files[0])} ref={inputref} required/>
<p class="mt-1 text-lg text-gray-500 dark:text-gray-300" id="file_input_help">Only support .png .jpg and .jpeg image file.</p>

  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
</form>

    </div>
    </div>
      
        </div>
        </div>
       
    </div>
  )
}

export default Profile