import React from 'react'

const Booking = ({bookingid,hotel,userid,fromdate,todate,status}) => {
   
  return (
    
    
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className=" text-lg px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {bookingid}
                    </th>
                    <td className=" text-lg px-6 py-4">
                        {hotel}
                    </td>
                    <td className="text-lg px-6 py-4">
                        {userid}
                    </td>
                    <td className="text-lg px-6 py-4">
                        {fromdate}
                    </td>
                    <td className="text-lg px-6 py-4">
                        {todate}
                    </td>
                    <td className="px-6 py-4">
                    {status==="booked"?<span className="bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Confirmed</span>:<span className="bg-red-100 text-red-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Cancelled</span>
}
                    </td>
                </tr>
                
                
            </tbody>

  )
}

export default Booking