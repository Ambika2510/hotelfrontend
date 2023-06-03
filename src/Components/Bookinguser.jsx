import React from 'react'
import axios from 'axios'

const Bookinguser = ({bookingid,hotel, fromdate,todate,amount,transactionid,status}) => {
  if(!localStorage.getItem("user")){
    window.location.href="/home"
  }

  const cancelbooking=async ()=>{
    const data=JSON.parse(localStorage.getItem("user"))
    const config={	
      headers: {
      'authorization': `Bearer ${data.token}`
  }}
  const fcc={fcc:"true"}
     
    const res= await axios.patch("https://hotel-backend0987.onrender.com/api/updatebooking/"+bookingid,fcc,config);
    window.location.reload();
  }
  return (
    
    <div className="m-1  md:flex  justify-between  min-w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<div>
<h1 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name:   {hotel}</h1>
    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Transaction Id:{" "+transactionid}</h2>
    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Fromdate:{fromdate}</h2>
    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Todate:{todate}</h2>
    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Amount:{amount}</h2>
    
    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Status:{status==="booked"?<span className="bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Confirmed</span>:<span className="bg-red-100 text-red-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Cancelled</span>
}</h2>
     </div>
    <div>
   {status==="booked"? <button  onClick={cancelbooking} type="button" className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-3">Cancel Booking</button>:""}
    </div>
    </div>
 
  )
}

export default Bookinguser