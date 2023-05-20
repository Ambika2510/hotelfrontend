import React,{useState,useEffect}from 'react'
import Navbar from '../Components/Navbar'
import axios from "axios"
import Front from '../Components/Front'
import { DatePicker} from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const HomeScreen = () => {
    const [hotels, sethotels] = useState([]);
    const [duplicatehotels, setduplicatehotels] = useState([]);
    const [fromdate, setfromdate] = useState('undefined');
    const [todate, settodate] = useState('undefined');
    useEffect(() => {
      axios.get("http://localhost:3700/api/getallrooms")
      .then((res)=>{
        
        sethotels(res.data)
        setduplicatehotels(res.data)
      });
    },[])
   const filterbydate=(dates)=>{
      
    const s=moment(dates[0].$d).format('DD-MM-YYYY');
    const e=moment(dates[1].$d).format('DD-MM-YYYY')
    setfromdate(s);
    settodate(e);
            console.log(s,e);
  
 let temphotel=[];
 for(const room of duplicatehotels){
  if(room.maxcount!==0){
         temphotel.push(room);
  }
 }
 sethotels(temphotel);
  


    }
  return (
    <div>
      <Navbar/>
      <div className='  flex justify-center m-3 p-2'>
<div className='border-2 border-solid border-black   '>  <RangePicker format='DD-MM-YYYY' className='p-2'  onChange={filterbydate} /></div>
    </div>
<div className="">
  {hotels.length>0?<div className='flex justify-center'><div className='m-3 '>{hotels.map((hotel)=> (<Front key={hotel._id} hotel={hotel} fromdate={fromdate} todate={todate}/>))}</div></div>:<h1 className="m-6 text-center text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">!!Sorry No More Hotels Available...</h1>}
  </div>


    </div>
  )
}

export default HomeScreen