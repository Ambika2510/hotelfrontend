import React from 'react'

const Hotel = ({hotelid,hotel,type,rent,maxcount,phone}) => {
  return (
    <tbody>
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className=" text-lg px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
           {hotelid}
        </th>
        <td className="px-6 py-4 text-lg ">
            {hotel}
        </td>
        <td className="px-6 py-4 text-lg">
            {type}
        </td>
        <td className="px-6 py-4 text-lg">
            {rent}
        </td>
        <td className="px-6 py-4 text-lg">
            {maxcount}
        </td>
        <td className="px-6 py-4 text-lg">
      {phone}

        </td>
    </tr>
    
    
</tbody>
  )
}

export default Hotel