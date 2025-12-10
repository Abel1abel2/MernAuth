import React, {useCallback, useContext,useEffect,useRef, useState } from 'react'
import img from '../assets/asset'
import axios from 'axios'
import { GlobalContext } from '../context/Context'
import { useNavigate } from 'react-router-dom'

const Verify = () => {
  const initialTime=30*1000
  const [timer,setTimer]=useState(initialTime)
  const inputRef=useRef([])
  const runRef=useRef(false)
  const navigate=useNavigate()
  const {backendUrl}=useContext(GlobalContext)
  const nextInput=(e,index)=>{
    if(e.target.value && index<inputRef.current.length-1){
      inputRef.current[index+1].focus()
    }
  }
   const deleteInput=(e,index)=>{
      if(e.key==='Backspace'&& index>0 && e.target.value===''){
        inputRef.current[index-1].focus()
      }
    }
    const handlePaste=(e)=>{
      const paste=e.clipboardData.getData('text')
      const pasteArray=paste.split('')
      pasteArray.forEach((char,index)=>{
        if(inputRef.current[index]){
          inputRef.current[index].value=char
        }
      })
    }

    const handleVerification=useCallback(async()=>{
      try{
        console.log('handleVerification called')
        setTimer(initialTime)
      
      const {data}=await axios.post(backendUrl+'/api/user/send',{},{withCredentials:true})
      if(data){
        console.log(data.message)
      }
      else{
        console.log('error again')
      }}
      catch(error){
        console.log(error.message)
      }
    }
  ,[backendUrl,initialTime])


    const handleSubmit=async(e)=>{
      try{
        e.preventDefault()
        const otpArray=inputRef.current.map(e=>e.value)
        const otp=otpArray.join('')
        if(timer!=0){
        const {data}=await axios.post(backendUrl+'/api/user/verify',{otp},{withCredentials:true})
        if(data.success){
          navigate('/')
        }
        else{
          console.log(data.message)
        }}
        else{
          console.log('otp expired')
        }


      }
      catch(error){
       console.log(error.message)
      }
    }
    useEffect(()=>{
      if(!runRef.current){
           handleVerification()
           runRef.current=true
      }
   
},[handleVerification])
useEffect(()=>{
  setTimeout(()=>{
    if(timer>0){
    setTimer((prev)=>(prev-1000))}
  },1000)

},[timer])
const getSecond=(timer)=>{
  let totalSeconds=parseInt(Math.floor(timer/1000))
  let second=parseInt(totalSeconds%60)
  return second
}
  return (
    <>
    <div className='w-110 sm:w-184 min-h-50 ml-10 sm:ml-100 h-50 mt-5    bg-blue-800  absolute '>
    <form onSubmit={handleSubmit} className=' mt-10 text-center flex flex-col justify-between space-y-4 max-h-150 py-5 sm:py-10 min-w-100 sm:max-w-600 bg-gray-100'>
       
       <img className='w-57 h-40 mx-auto rounded-[30px] z-10' src={img.verify} />
       <h1 className='font-bold sm:text-3xl text-2xl'>Otp Verification</h1>
       <p className='text-gray-900 sm:text-[21px] text-[15px]'>please type the verification ,code expires with in <span className='text-red-700'>{getSecond(timer)}</span></p>
      <div onPaste={(e)=>handlePaste(e)} className='sm:px-35 px-10 h-50 mt-8 flex justify-between sm:w-200 w-100 sm:space-x-5 space-x-1 '>
       {
        Array(6).fill(0).map((_,index)=><input ref={e=>inputRef.current[index]=e} key={index} onKeyDown={(e)=>deleteInput(e,index)} onInput={(e)=>nextInput(e,index)}  type='text' maxLength={1} className='sm:w-15 w-10 sm:h-20 h-15 mt-3 bg-white rounded-[10px] outline-none sm:px-5  text-2xl shadow-lg' />)
       }
       </div>
       <p onClick={handleVerification} className='text-gray-900 sm:text-[21px] text-[15px] text-left ml-33'>Otp not received.<span className='px-3 text-blue-700 cursor-pointer'>Resend</span></p>
       <button type='submit' className='bg-black text-white text-2xl rounded-[10px] w-80 h-15 sm:h-25 sm:w-120 mt-5 sm:ml-33 ml-13  cursor-pointer'>Verify</button>
    </form>
  
  
    </div>
    </>
  )
}

export default Verify
