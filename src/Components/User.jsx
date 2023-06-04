import React from 'react'

const User = ({userid,name,email,admin,url}) => {
  return (
    <tbody>
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className=" text-lg px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
           {userid}
        </th>
        <td className="px-6 py-4 text-lg flex items-center">
        <img src={url} className="w-12 h-12 rounded-full border-2 border-black mr-3 " alt="Flowbite Logo" />{name}
        </td>
        <td className="px-6 py-4 text-lg">
            {email}
        </td>
        <td className="px-6 py-4 text-lg">
            {admin==="false"?"No":"Yes"}
        </td>
     
    </tr>
    
    
</tbody>
  )
}

export default User