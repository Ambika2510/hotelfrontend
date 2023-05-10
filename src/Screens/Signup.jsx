import React,{useState} from 'react'
import axios from 'axios';
import Navbar from '../Components/Navbar'
const Signup = () => {
    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const  handleSubmit =  (e) => {
    e.preventDefault()
    const signup = { name,email, password };
   
    axios.post('http://localhost:3700/api/signup', signup)
        .then((res )=> {
            if(res.status===200){
                 setName("");
                setEmail("");
                setPassword("");
                window.location.href="/";
                console.log("signup success")
              }
        })
        .catch(err => {  
          const error = err.response.data.error
          console.log(error)
            
         })

  }
  return (
    <div><Navbar/>
    <div className="flex justify-center content-center">
    <div className="w-96 p-6  m-8  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
<form  onSubmit = {handleSubmit}>
<div className="mb-6">
    <label for="text" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Your name</label>
    <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" onChange = {(e) => setName(e.target.value)} value = { name }required/>
  </div>
  <div className="mb-6">
    <label for="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz@gmail.com" onChange = {(e) => setEmail(e.target.value)} value = { email }required/>
  </div>
  <div className="mb-6">
    <label for="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange ={(e) => setPassword(e.target.value)} value = { password } required/>
  </div>
  

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
</form>
</div>
    </div>
    </div>
  )
}

export default Signup