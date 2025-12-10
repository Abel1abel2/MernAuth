import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { GlobalContext } from '../context/Context'
import axios from 'axios'
import { useNavigate } from 'react-router'

const AuthSucess = () => {
  const {backendUrl}=useContext(GlobalContext)
  const navigate=useNavigate()

  useEffect(()=>{
    const handle=async()=>{
      const params=new URLSearchParams(window.location.search)
      const accessToken=params.get('token')
      console.log('token',accessToken)
      if(accessToken){
        localStorage.setItem('token',accessToken)
      }
      try{
        const result=await axios.get(backendUrl+'/auth/me',{
          headers:{
            Authorization:`Bearer ${accessToken}`
          }
        })
        if(result.data.success){
            console.log('successfull')
            navigate('/')
          }
        
      }
      catch(error){
        console.log(error.message)
      }
    }
handle()
  },[navigate,backendUrl])
  return (
    <div>
      <h2>signing in</h2>
      
    </div>
  )
}

export default AuthSucess
