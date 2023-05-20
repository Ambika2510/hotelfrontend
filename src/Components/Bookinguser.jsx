import React from 'react'

const Bookinguser = ({hotelid,hotel, fromdate,todate,amount,transactionid,status}) => {
  return (
    
    <div className="m-1  flex  justify-items-center  mr-6 ml-4 leading-normal min-w-full p-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<div>
<h1 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name:   {hotel}</h1>
    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Transaction Id:{" "+transactionid}</h2>
    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Fromdate:{fromdate}</h2>
    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Todate:{todate}</h2>
    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Amount:{amount}</h2>
    
    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Status:{status}</h2>
    <div className='flex flex-row-reverse'>
    <button   type="button" className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-3">Cancel Booking</button>
    </div>
    </div>
    </div>
 
  )
}

export default Bookinguser