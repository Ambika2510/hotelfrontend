import React,{useState,useEffect} from 'react'
import moment from 'moment';
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const Bookingscreen = () => {
  if(!localStorage.getItem("user")){
    window.location.href="/home"
  }
    const id = useParams().id;
    const data=JSON.parse(localStorage.getItem("user"))
    const uid=data.id
    const fromdate=useParams().fromdate;
    const todate=useParams().todate;
    const totaldays=moment(todate,"DD-MM-YYYY").diff(moment(fromdate,"DD-MM-YYYY"),'days')+1;
    const [clientToken, setclientToken] = useState("");
    const[instance,setInstance]=useState("");

    // const [loading, setloading] = useState(false);
    const [hotel, sethotel] = useState({});
    useEffect(() => {
        axios.get(`https://hotel-backend0987.onrender.com/api/getroomdetail/${id}`)
        .then((res)=>{
            sethotel(res.data)
        });
       gettoken()  
    }, [])
  
    
 
      const gettoken=async()=>{
        try{
const res=await axios.get("https://hotel-backend0987.onrender.com/api/gettoken")
console.log(res.data.token)
setclientToken(res.data.clientToken)
        }
        catch(err){
          console.log(err);
        }
      }

        const handlepayment=async()=>{
          try{
            const { nonce } = await instance.requestPaymentMethod();
            const bookingdata={
              room:hotel,
              userid:uid,
              fromdate:fromdate,
              todate:todate,
              totalamount:hotel.rentperday*totaldays,
              totaldays:totaldays,
              transactionid:"123445323",
              nonce
             
            } 
            const config={	
              headers: {
              'authorization': `Bearer ${data.token}`
          }}
          const fcc={fcc:"fcc"}
          const res=await axios.post("https://hotel-backend0987.onrender.com/api/bookroom",bookingdata,config)
        axios.patch(`https://hotel-backend0987.onrender.com/api/updateroom/${id}`,fcc,config).then((res)=>{
          window.location.href="/home"})
          }
          catch(err){
            const error = err.response.data.error
             toast.error(error,{position:"top-center",autoClose:5000})
          }
       
    }
  return (
    <div>
    <Navbar/>
    <div className='m-5  flex justify-center '>
    <div className="md:flex justify-center bg-white border border-gray-200  shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <div className='mr-7'>
        <h5 className=" m-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{hotel.name}</h5>
        <img className="object-cover w-full m-3 rounded-t-lg h-96 md:h-auto md:w-96 md:rounded-none md:rounded-l-lg" src={Object.keys(hotel).length>0?hotel.imageurl[0]:""} alt=""/>
          </div> 
   
    <div className="flex flex-col justify-between p-4 mr-6 ml-6 leading-normal">
    <h5 className=" mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Booking details:</h5>
    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Name:{hotel.maxcount}</h2>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">From:{fromdate}</h2>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">To:{todate}</h2>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Number of room available:{hotel.maxcount}</h2>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Total days:{totaldays}</h2>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Rent per day:{" "+hotel.rentperday+" "+"Rs"}</h2>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-black">Total Amount:{" "+hotel.rentperday*totaldays+" "+"Rs"}</h2>
       
      
    {!clientToken ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

<button   type="button" onClick={handlepayment}className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-3">Pay Now</button>
                  </>
                )}
       
      </div>
    </div>
    </div>
    <ToastContainer autoClose={40000}/>
    </div>
  )
}

export default Bookingscreen