import React from 'react'
import img from '../assets/asset.js'
import { useState } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/Context.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router'
const Login = () => {
  const {backendUrl,setToken}=useContext(GlobalContext)
  const [currentState,setCurrentState]=useState('Login')
  const [hidePassword,setHidePassword]=useState(true)
  const [userName,setUserName]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const [error,setError]=useState('')
 
  const navigate=useNavigate('')


  const submitHandler=async(e)=>{
    e.preventDefault()
    try{
      if(currentState=="SignUp"){
            const result=await axios.post(backendUrl+'/api/user/register',{userName,email,password},{withCredentials:true})
            if (result.data.success==true && result.data.token){
              setToken(result.data.token)
              navigate('/verify')
            }
            else{
              setError(result.data.error)
            }
      }
      else{
        const result=await axios.post(backendUrl+'/api/user/login',{email,password},{withCredentials:true})
        if(result.data.success==true && result.data.token){
          setToken(result.data.token)
          navigate('/verify')
          console.log(result.data.token)
        }
        else{
          setError(result.data.error)
        }
      }
  
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <>
    <div className='flex'>
      <div className='ml-[60px] sm:ml-[80px] w-[700px] mt-[20px]'>
        <img className='ml-[-50px] sm:ml-7 w-8 h-8 sm:w-12 sm:h-12  mt-1' src={img.link}  alt='noimage' />
        <h1 className='sm:mt-1 mt-4 text-xl sm:text-2xl sm:ml-35 font-medium  '>Welcome to our site</h1>
        <form onSubmit={submitHandler} className='flex mt-3 sm:mt-1 ml-10 flex-col  gap-5  '>
          {currentState=="SignUp"?<><label className='ml-[-80px] sm:ml-1 text-gray-500'>User name</label>
          <input className='ml-[-80px] sm:ml-1 w-50 sm:w-130 p-5 h-10 rounded-[5px] bg-gray-100 focus:border-blue-400 focus:border-1  shadow-lg  outline-none ' type='text' placeholder='enter username' onChange={(e)=>setUserName(e.target.value)} value={userName}  />
     </>:null}
      
          <label className='ml-[-80px] sm:ml-1 text-gray-500'>Email</label>
          <input className='ml-[-80px] sm:ml-1 w-50 sm:w-130 p-5 h-10 rounded-[5px] bg-gray-100 focus:border-blue-400 focus:border-1  shadow-lg  outline-none' type='email' placeholder='enter email' onChange={(e)=>setEmail(e.target.value)} value={email}  />
       
          <label className='ml-[-80px] sm:ml-1 text-gray-500'>Password</label>
          <div className='flex'>
          <input className='ml-[-80px] sm:ml-1 w-50 sm:w-130 items-center p-5 h-10 rounded-[5px] bg-gray-100  focus:border-blue-400 focus:border-1 shadow-lg  outline-none' type={hidePassword==true?'password':'text'} placeholder='enter password' onChange={(e)=>setPassword(e.target.value)} value={password}  />

          {hidePassword==true?<img onClick={()=>setHidePassword(false)}  className='relative ml-[-50px] mt-2  w-6 h-6 cursor-pointer' src={img.hide} alt=""  /> : 
          <img  onClick={()=>setHidePassword(true)} className='relative ml-[-50px] mt-2  w-6 h-6 cursor-pointer' src={img.view} alt=""  />
          }
          </div>
            { error && <p className='ml-[-80px] sm:ml-1 text-red-700 ml-1'>{error}</p>
            }
          <button  className='ml-[-80px] sm:ml-1 w-50 sm:w-130  h-10 rounded-[5px] text-white bg-black cursor-pointer mt-1 hover:bg-gray-800'>{currentState}</button>
          <div className='flex items-center gap-4 mt-1'>
          <hr className='sm:w-59  w-17 ml-[-70px] sm:ml-1'/>
          <p className='mb-3'>or</p>
          <hr className='sm:w-59 w-17'/>
          </div>
          <button onClick={()=>{window.open(`${backendUrl}/auth/google`,'_self')}} className='ml-[-80px]  sm:ml-1 w-40 sm:w-130 sm:flex sm:justify-between sm:pl-5 sm:pr-50 rounded-[10px]  sm:items-center border border-gray-300 h-15  cursor-pointer hover:bg-blue-300'>
            <img className='sm:w-5 w-10 ml-15 mt-2 sm:ml-3' src={img.google}/>
            <p className='sm:mr-3 hidden sm:block '>Login with google</p>
          </button>
        
          {
            currentState=="SignUp"? <p className='text-sm text-gray-600 ml-[-80px] sm:ml-1 '>Already have an account. <span onClick={()=>setCurrentState("Login")} className='text-blue-500 cursor-pointer'>sign in?</span></p>:
            <p className='text-sm text-gray-600 ml-[-80px] sm:ml-1 '>Create a new account. <span onClick={()=>setCurrentState("SignUp")} className='text-blue-500 cursor-pointer'>sign up?</span></p>
          }
     
        </form>
      </div>
      <div>
           <img className='sm:mt-8 mt-25 sm:ml-1 ml-[-20px]  w-180 sm:w-150  h-120 sm:h-160 rounded-[30px]' src={img.auth}/>

      </div>
    </div>
    </>
  )
}

export default Login
