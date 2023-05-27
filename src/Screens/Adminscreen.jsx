import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Navbar from '../Components/Navbar';
import Booking from '../Components/Booking';
import Hotel from '../Components/Hotel';
import User from '../Components/User';
import Addhotel from'../Components/Addhotel';
import { Tabs } from 'antd'
    const {TabPane}=Tabs;

const Adminscreen = () => {
    const [bookings,setbooking]=useState([]);
    const [hotels,sethotel]=useState([]);
    const [users,setuser]=useState([]);
    if(!localStorage.getItem("user")){
        window.location.href="/"
    
    }
    else if(localStorage.getItem("user")){
        const data=JSON.parse(localStorage.getItem("user"))
        const id=data.id;
        const config={	
          headers: {
          'authorization': `Bearer ${data.token}`
      }}
          const res=axios.get(`http://localhost:3700/api/user/${id}`,config).then((res)=>{
              if(res.data.isadmin===false){
                    localStorage.removeItem("user")
                    window.location.href="/"
              }  
          });
    }
    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem("user"))
        const id=data.id;
        const config={	
          headers: {
          'authorization': `Bearer ${data.token}`
      }}
axios.get("http://localhost:3700/api/getallbooking",config).then((res)=>{
    setbooking(res.data);
})
axios.get("http://localhost:3700/api/getallrooms").then((res)=>{
    sethotel(res.data);
})
axios.get("http://localhost:3700/api/getalluser",config).then((res)=>{
    setuser(res.data);
})
    },[])
  return (
    <div>
        <Navbar/>
        <div className='m-4'>
        <h1 className='text-3xl  font-semibold text-center text-white'>Admin Panel</h1>
    <Tabs defaultActiveKey="1" className='text-white text-xl font-semibold' >
        <TabPane className='text-lg text-white' tab="Bookings" key="1" >
             { bookings.length>0?<div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 text-lg">
                        Booking id
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                       Hotel
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                        User id
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                       From date
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                       To date
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                       Status
                    </th>
                </tr>
            </thead>{bookings.map((booking)=> (<Booking key={booking._id} bookingid={booking._id} hotel={booking.room} userid={booking.userid} fromdate={booking.fromdate} todate={booking.todate} status={booking.status} />))}  </table>
    </div>:<h1 className="m-6 text-center text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">!!No Booking Available...</h1>}
        </TabPane>
        <TabPane tab="Rooms" key="2">
        { hotels.length>0?<div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 text-lg">
                        Hotel id
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                       Hotel
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                        Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                     Rent per day
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                       Max number of room
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                       Phone number
                    </th>
                </tr>
            </thead>{hotels.map((hotel)=> (<Hotel key={hotel._id} hotelid={hotel._id} hotel={hotel.name} type={hotel.type} rent={hotel.rentperday} maxcount={hotel.maxcount} phone={hotel.phonenumber} />))}  </table>
    </div>:<h1 className="m-6 text-center text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">!!No Hotel Available...</h1>}
        </TabPane>
        <TabPane tab="Users" key="3">
        { users.length>0?<div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 text-lg">
                        User id
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                       Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                     Is Admin
                    </th>
                </tr>
            </thead>{users.map((user)=> (<User key={user._id} userid={user._id} name={user.name} email={user.email} admin={user.isadmin}  />))}  </table>
    </div>:<h1 className="m-6 text-center text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">!!No User Registered...</h1>}
        </TabPane>
        <TabPane tab="Add Hotel" key="4">
                  <Addhotel/>
        </TabPane>

    </Tabs>
        </div>
    </div>
  )
}

export default Adminscreen