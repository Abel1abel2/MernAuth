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
       localStorage.removeItem('token');
      setLoginStatus('Login')
      navigate('/login')
    }
    else{
      console.log('error during logout')
    }
  }
 console.log('token:',token)
  return (
    <div className='w-[100vw] h-screen bg-[#313131]'>
    <div className='md:w-[90%] w-[90%] h-full mx-[5%]   sm:px-10  px-5'>

     
      <div className='w-full h-20 flex justify-between items-center '>
         
         <div className='flex space-x-4 '>
      <img className='sm:w-12 sm:h-12 w-8 h-8 cursor-pointer ' onClick={()=>navigate('/')} src={img.link}/>
        <h2 className='font-concert-one mt-1 sm:text-[24px] text-[16px] text-[#9CFC97]'>Mern<span className='text-[#A6A5A5]'>Auth</span></h2>
        </div>
        
        <div className='flex sm:space-x-6 space-x-1'>
          {
            token||console.log('token:',token)?<><div onClick={()=>logout()} className='sm:w-[80px] w-[60px] sm:h-8 h-6 text-center rounded bg-white border-black border-2 cursor-pointer'>
          <p>Logout</p>
          </div>
          </>:<> <Link onClick={()=>setLoginStatus('Login')} to='/login'>
              <p className='text-white cursor-pointer sm:text-[16px] text-[14px]'>SignIn</p></Link>
        
            <div className='sm:w-[80px] w-[60px] sm:h-8 h-6 text-center rounded bg-white border-black border-2 cursor-pointer'>
          <Link onClick={()=>setLoginStatus('SignUp')} to='/login'>
          <p className='sm:text-[16px] text-[14px]'>SignUp</p>
          </Link>
          </div></>
          }
        </div>

      </div>


      <div className='font-poppins text-white text-left   md:px-[5%] px-[5%]   py-5     h-[80%] flex flex-col '>
      <h1 className=' md:text-[28px] lg:text-[35px] sm:text-[24px] text-[18px] ml-[10%] mt-20 sm:ml-[30%]  font-bold'>Welcome to Mern Auth </h1>
      <p className='sm:text-[16px] text-[12px]   my-5  text-left font-medium'>This site has full mern-stack authentication including Otp and Oauth using google it modernize, the web developed using mern stack for verification nodeMailer and for oauth google </p>
      <img src={img.pc} className='sm:w-[50%] w-[70%] h-30 lg:h-50 rounded sm:ml-[25%] ml-[10%]'/>
      <Link to='/login'>
      <button className='w-[30%]  lg:w-[25%] py-3  mt-5 mx-[30%] sm:mx-[35%] lg:sm-[40%] rounded bg-[#9CFC97] sm:text-[24px] text-[12px] cursor-pointer text-[#313030]'>Get Start</button>
      </Link>
      </div>

    </div>
    </div>
  )
}

export default Home
