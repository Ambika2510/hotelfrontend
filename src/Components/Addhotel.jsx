import React,{useRef}from 'react'
import {useState} from 'react'
import axios from 'axios'
import {storage} from '../Firebase'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {v4} from "uuid"
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'  

const Addhotel = () => {
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
    const [name,setname]=useState("");
    const[type,settype]=useState("");
    const[maxcount,setmaxcount]=useState("");
    const[phonenumber,setphonenumber]=useState("");
    const[rentperday,setrentperday]=useState("");
     const[description,setdescription]=useState("");
     const [filename1,setfilename1]=useState(null);
     const [filename2,setfilename2]=useState(null);
     const [filename3,setfilename3]=useState(null);
     const inputref=useRef(null);
     const handlesubmit=async(e)=>{
 
        e.preventDefault();
        if(filename1===null||filename2===null||filename3===null){
          toast.error("image will not be uploaded",{position:"top-center",autoClose:8000})
          return}
        else{
          toast.success("!!Wait...data will be uploaded",{position:"top-center",autoClose:40000})
          const imagerf1=ref(storage,`hotelimages/${filename1.name+v4()}`);
          const imagerf2=ref(storage,`hotelimages/${filename2.name+v4()}`);
          const imagerf3=ref(storage,`hotelimages/${filename3.name+v4()}`);
          uploadBytes(imagerf1,filename1).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url1)=>{
              uploadBytes(imagerf2,filename2).then((snapshot)=>{
                getDownloadURL(snapshot.ref).then((url2)=>{
                  uploadBytes(imagerf3,filename3).then((snapshot)=>{
                    getDownloadURL(snapshot.ref).then((url3)=>{
                      console.log(url1,url2,url3)
                      const data={
                        name,
                        type,
                        maxcount,
                        phonenumber,
                        rentperday,
                        description,
                        url1,
                        url2,
                        url3
                      }
                      const datax=JSON.parse(localStorage.getItem("user"))
                      const id=datax.id;
                      const config={	
                        headers: {
                        'authorization': `Bearer ${data.token}`
                    }}
                      axios.post("http://localhost:3700/api/createroom",data,config).then((res)=>{
                        if(res.status===200){
            
                          toast.success("data will be uploaded successfully",{position:"top-center",autoClose:5000})
                          setname("");
                          settype("");
                          setmaxcount("");
                          setphonenumber("");
                          setrentperday("");
                          setdescription("");
                          setfilename3(null);
                          setfilename2(null);
                          setfilename1(null);
                          inputref.current.value = null;
                          window.location.reload();
                          console.log("hotel added successfully")
                        }
                    })
                    .catch((err)=>{
                      const error = err.response.data.error
                      toast.error(error,{position:"top-center",autoClose:8000})
                 })
                   })
                   })
               })
               })
           })
           })

      }
    }
  return (
    <div>
        <div className="flex justify-center content-center">
    <div className=" p-6  m-8  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-w-[50%]">
        
<form onSubmit={handlesubmit}>
  <div className="mb-6">
    <label for="text" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Hotel Name</label>
    <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz" onChange={(e)=>setname(e.target.value)}value={name} required/>
  </div>
  <div className="mb-6">
    <label for="text" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Type</label>
    <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="delux or non-delux" onChange={(e)=>settype(e.target.value)}value={type} required/>
  </div>
  <div className="mb-6">
    <label for="text" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Maximum Number of Room Available</label>
    <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz" onChange={(e)=>setmaxcount(e.target.value)}value={maxcount} required/>
  </div>
  <div className="mb-6">
    <label for="text" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Description</label>
    <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="description.." onChange={(e)=>setdescription(e.target.value)}value={description} required/>
  </div>
  <div className="mb-6">
    <label for="text" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Phone Number</label>
    <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="type only number" onChange={(e)=>setphonenumber(e.target.value)}value={phonenumber} required/>
  </div>
  <div className="mb-6">
    <label for="text" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Rent per day</label>
    <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz" onChange={(e)=>setrentperday(e.target.value)}value={rentperday} required/>
  </div>
  <div className='grid md:grid-cols-3 md:gap-3'>
  <div className="mb-6">
  <label class="block mb-2 text-lg font-medium text-gray-900 dark:text-white" for="file_input">Upload image 1</label>
<input class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e)=>setfilename1(e.target.files[0])} ref={inputref} accept="image/png, image/jpg, image/jpeg" required/>
<p class="mt-1 text-lg text-gray-500 dark:text-gray-300" id="file_input_help">Only support .png .jpg and .jpeg image file.</p>


  </div>
  <div className="mb-6">
  <label class="block mb-2 text-lg font-medium text-gray-900 dark:text-white" for="file_input">Upload image 2</label>
<input class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e)=>setfilename2(e.target.files[0])} ref={inputref} accept="image/png, image/jpg, image/jpeg" required/>
<p class="mt-1 text-lg text-gray-500 dark:text-gray-300" id="file_input_help">Only support .png .jpg and .jpeg image file.</p>


  </div>
  <div className="mb-6">
  <label class="block mb-2 text-lg font-medium text-gray-900 dark:text-white" for="file_input">Upload image 3</label>
<input class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e)=>setfilename3(e.target.files[0])} ref={inputref} accept="image/png, image/jpg, image/jpeg" required/>
<p class="mt-1 text-lg text-gray-500 dark:text-gray-300" id="file_input_help">Only support .png .jpg and .jpeg image file.</p>


  </div>
  </div>
  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Hotel</button>
</form>

    </div>
    </div>
    <ToastContainer autoClose={40000}/></div>
  )
  }


export default Addhotel