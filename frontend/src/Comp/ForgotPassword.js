import React, { useReducer, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import esilogin from '../assets/esilogin.png'
import {AuthData} from '../Auth/AuthContext'
const ForgotPassword = () => {
  const navigate = useNavigate();
  const {user} =AuthData()
  const {login} = AuthData()
  const [info,setinfo] = useReducer(
    (info,newItem)=>({...info,...newItem}),
    {
    name:"",
    password:""
    })
  const handlelogin = async(e)=>{
    e.preventDefault(); 
    try{
      await login(info.name , info.password)
      navigate(('/',user.role))
    }catch(err)
    {

    }
  }
  return (
    <div className='w-full h-screen flex justify-center items-center'>
    <div className='bg-BG w-full flex justify-around items-center h-screen'>
    <div className="fixed h-screen -left-1/4 -top-1/2 aspect-square rounded-full bg-gradient-to-br from-primary via-primary/70 to-primary/10 blur-3xl opacity-60 z-0"></div>
    <div className="fixed h-screen -right-1/4 -bottom-1/2 aspect-square rounded-full bg-gradient-to-br from-primary via-primary/70 to-primary/10 blur-3xl opacity-30 z-0"></div>
      <div className='w-1/3 flex flex-col justify-center items-center h-3/5 gap-3'>
      <h1 className='font-semibold text-3xl'>Forgot password?</h1>
      <p className='font-semibold text-xs text-gray'>No worries! Just enter your email address and we'll help you reset it</p>
          <form className="flex flex-col w-9/12 gap-1 mt-4" onSubmit={handlelogin}>
            <label htmlFor="name" className="font-montserrat text-[10px] font-semibold text-blue">School email:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="border border-primary focus:border-sky-800  focus:outline-none p-1" 
              value={info.name}
              onChange={(e) => setinfo({ name: e.target.value })}
            />
            <input 
              type="submit" 
              value="Reset password" 
              className="bg-primary hover:bg-sky-800 flex font-montserrat font-semibold justify-center p-1 font-montserrat text-white mt-5 rounded-md" 
            />
          </form>
          <a href='/Login' className='flex flex-row text-slate-700 gap-1 items-center font-semibold mt-2 '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mt-[2px]">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>

          Back to log in</a>
      </div>
      </div>
    </div>
  )
}

export default ForgotPassword
