import React,{useState,useEffect}from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
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
    const [search, setsearch] = useState('');
    const [type, settype] = useState('all');
    useEffect(() => {
      axios.get("https://hotel-backend0987.onrender.com/api/getallrooms")
      .then((res)=>{
        
        sethotels(res.data)
        setduplicatehotels(res.data)
      });
    },[])
    const filterBysearch=()=>{
      const temphotels=duplicatehotels.filter((hotel)=>hotel.name.toLowerCase().includes(search.toLowerCase()));
      sethotels(temphotels);
    }
    const filterbytype=(e)=>{
    settype(e);
      if(e==='all')
     {sethotels(duplicatehotels); }
      else{
        const temphotels=duplicatehotels.filter((hotel)=>hotel.type.toLowerCase()===(e.toLowerCase()));
      sethotels(temphotels);
        
      }
    }
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
      <div className='min-h-[70vh]'>
      <div className='sm:flex justify-center m-3 p-2'>
<div className=' flex justify-center sm:border-2 border-solid border-black   '>  <RangePicker format='DD-MM-YYYY' className='p-2'  onChange={filterbydate} /></div>
<div className='flex justify-center max-sm:mt-2 '>
<div>
            <input type="text" id="first_name" className="bg-gray-50 mx-4 border-2 border-solid border-black  text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search hotels" value={search} onChange={(e)=>{setsearch(e.target.value)}} onKeyUp={filterBysearch} required/>
        </div>
        <div className='mx-4'>
          <select className='"bg-gray-50 mx-4  border-2 border-solid border-black  text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={type} onChange={(e)=>{filterbytype(e.target.value)}}>
            <option value="all">All</option>
            
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
</div>
    </div>
<div className="">
  {hotels.length>0?<div className='flex justify-center'><div className='m-3 '>{hotels.map((hotel)=> (<Front key={hotel._id} hotel={hotel} fromdate={fromdate} todate={todate}/>))}</div></div>:<h1 className="m-6 text-center text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">!!Sorry No More Hotels Available...</h1>}
  </div>
  </div>
<Footer/>

    </div>
  )
}

export default HomeScreen