import React from 'react'

const Footer = () => {
  return (
   
<footer className=" shadow w-full bg-zinc-600 dark:bg-gray-900">
    <div className="w-full container mx-auto p-4 md:px-6 md:py-8">
       
          
         <p className="text-center   text-slate-100 text-xl font-medium">For any queries related contact : kumarambika2510@gmail.com </p>
         <p className="mt-2 text-center   text-slate-100 text-xl font-medium">Owner : Ambika Singh Rajput </p>
            
       
        <hr className="my-6 border-gray-200 lg:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex justify-center text-xl font-medium text-slate-100">© 2023 <a href="/home" className="hover:underline">Hotel Booking</a>.ALL Right Reserved</div>
    </div>
</footer>


  )
}

export default Footer