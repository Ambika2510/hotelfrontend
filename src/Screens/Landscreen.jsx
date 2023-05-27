import React from 'react'
import Navbar from '../Components/Navbar'
import {Link} from 'react-router-dom'
const Landscreen = () => {
  return (
    <div>
        <Navbar/>
    <div className=' flex justify-center items-center min-w-[70%] min-h-[80vh] '>
     <div >
     <h1 class="mb-4 text-4xl text-orange-600 font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white">Hottel Booking</h1>
      
<div className='flex justify-center min-w-full'>
<Link to="/home" className='items-center'><button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl mt-4 px-5 py-2.5 text-center ">Get Started</button></Link>
</div>
       
     </div>
        </div></div>
  )
}

export default Landscreen