import React, { useContext } from 'react'
import img from '../assets/asset'
import '../index.css'
import { Link, useNavigate } from 'react-router'
import { GlobalContext } from '../context/Context'
import axios from 'axios'

const Home = () => {
  const {setLoginStatus,token,backendUrl}=useContext(GlobalContext)
  const navigate=useNavigate()
  const logout=async()=>{
    
    const data=await axios.post(backendUrl+'/api/user/logout',{},{withCredentials:true})
    if(data){
      console.log('success logout')
      setLoginStatus('Login')
      navigate('/login')
    }
    else{
      console.log('error during logout')
    }
  }
 console.log('token:',token)
  return (
    <div className='w-full h-screen bg-[#313131]'>
    <div className='w-max-10 h-full mx-15'>
      <div className='w-full h-20 flex justify-between items-center'>
        <div className='flex space-x-4'>
      <img className='w-12 h-12' src={img.link}/>
        <h2 className='font-concert-one mt-1 text-[24px] text-[#9CFC97]'>Mern<span className='text-[#A6A5A5]'>Auth</span></h2>
        </div>
        <div className='flex space-x-6'>
          {
            token?<><div onClick={()=>logout()} className='w-25 h-8 text-center rounded bg-white border-black border-2 cursor-pointer'>
          <p>Logout</p>
          </div></>:<> <Link onClick={()=>setLoginStatus('Login')} to='/login'>
              <p className='text-white cursor-pointer'>SignIn</p></Link>
        
            <div className='w-25 h-8 text-center rounded bg-white border-black border-2 cursor-pointer'>
          <Link onClick={()=>setLoginStatus('SignUp')} to='/login'>
          <p>SignUp</p>
          </Link>
          </div></>
          }
      
    
      
        </div>

      </div>

      <div className='font-poppins text-white text-left sm:px-85 sm:py-10 py-20 sm:text-[50px] text-[30px]  sm:h-150 h-100 flex flex-col'>
      <h1>Welcome to Mern Auth </h1>
      <p className='sm:text-[16px] text-[12px] sm:w-170 w-100 my-10  text-left '>This site has full mern-stack authentication including Otp and Oauth using google it modernize, the web developed using mern stack for verification nodeMailer and for oauth google </p>
      <img src={img.pc} className='w-[700px] h-[220px] rounded-[25px]'/>
      <Link to='/login'>
      <button className='w-50 py-3  mt-10 sm:mx-60 mx-20 rounded bg-[#9CFC97] text-[24px] cursor-pointer text-[#313030]'>Get Start</button>
      </Link>
      </div>

    </div>
    </div>
  )
}

export default Home
