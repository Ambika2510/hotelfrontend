import React, { useState } from 'react';
import Carousel from './Carousel';
import {Link} from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Front = ({hotel,fromdate,todate}) => {
    const [show, setShow] = useState(0);

    const handleClose = () => setShow(0);
    const handleShow = () => setShow(1);
  
    const url=hotel.imageurl[0];
  
    const url2=hotel.imageurl[1];
    const url3=hotel.imageurl[2];
    const images=[url,url2,url3];
    const handleclick=()=>{
        if(fromdate==="undefined"||todate==="undefined"||!localStorage.getItem("user")){
            toast.error("Please select both date and login to book hotel",{position:"top-center",autoClose:5000})
        }
        else{
            return;
        }
    }
  return (
    <div className='m-1 border-2  border-gray-400'>
        

       
<div className="flex flex-col items-center bg-white border border-gray-200  shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img className="object-cover w-full m-3 rounded-t-lg h-96 md:h-auto md:w-96 md:rounded-none md:rounded-l-lg" src={url} alt=""/>
    <div className="flex flex-col justify-between p-4 mr-6 ml-4 leading-normal">
        <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{hotel.name}</h5>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Number of Room available:{" "+hotel.maxcount}</h2>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Phone number:{hotel.phonenumber}</h2>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Type:{hotel.type}</h2>
        <div className='flex flex-row-reverse'>
        <button  onClick={handleShow} type="button" className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-3">View details</button>
        <Link to={fromdate==="undefined"||todate==="undefined"||!localStorage.getItem("user")?"/home":"/bookingroom/"+hotel._id+"/"+fromdate+"/"+todate}><button  onClick={handleclick} type="button" className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-3">Book</button>
        </Link>
        </div>
       

      
    </div>
    {show===1?
<div className=" fixed top-20 max-w-2xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<div className="p-2"> 
<h5 className="m-2 border-b-2   border-gray-300 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{hotel.name}</h5>
<Carousel images={images}/>
  
    
        <p className="m-3  text-lg font-medium text-black-700 ">{hotel.description}</p>
        <button onClick={handleClose} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
           Close
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>
</div>
:""}
 
</div>
  
<ToastContainer autoClose={10000}/>
    </div>
  )
}

export default Front