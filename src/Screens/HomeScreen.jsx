import React,{useState,useEffect}from 'react'
import Navbar from '../Components/Navbar'
import axios from "axios"
import Front from '../Components/Front'
const HomeScreen = () => {
    const [hotels, sethotels] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:3700/api/getallrooms")
      .then((res)=>{
        
        sethotels(res.data)
      });
    }, [])
  return (
    <div>
      <Navbar/>
<div className="">
  {hotels.length>0?<div className='flex justify-center'><div className='m-3 '>{hotels.map((hotel)=> (<Front key={hotel._id} hotel={hotel}/>))}</div></div>:<h1 className="m-6 text-center text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">!!Sorry No More Hotels Available...</h1>}
  </div>


    </div>
  )
}

export default HomeScreen