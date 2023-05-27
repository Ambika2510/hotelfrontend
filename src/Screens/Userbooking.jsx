import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Bookinguser from '../Components/Bookinguser'

const Userbooking = () => {
    const [bookings, setbookings] = useState([]);
    const id = useParams().id;
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

        axios.get("http://localhost:3700/api/getroombyuser/"+id,config).then((res)=>{
            setbookings(res.data)
        })
        .catch((err)=>{console.log(err.message)});
    },[])
  return (
    <div>
        <Navbar/>
        {bookings.length===0?<h1 className='text-center text-5xl font-bold m-8'>No Bookings!!!</h1>:
        <div className='m-3 flex justify-center '><div className='min-w-[40%]'>{bookings.map((hotel)=> (<Bookinguser key={hotel._id} bookingid={hotel._id} hotel={hotel.room} fromdate={hotel.fromdate} todate={hotel.todate} amount={hotel.totalamount} transactionid={hotel.transactionid} status={hotel.status}/>))}</div></div>
         }

    </div>
  )
}

export default Userbooking