import React, { useReducer, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import {AuthData} from '../Auth/AuthWrapper'
const Login = () => {
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
      <div className='w-1/3 flex justify-center items-center h-3/5'>
          <form className="flex flex-col w-9/12 gap-1" onSubmit={handlelogin}>
            <label htmlFor="name" className="font-montserrat text-[10px] font-semibold text-blue">School email:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="border border-primary focus:border-sky-800  focus:outline-none p-1" 
              value={info.name}
              onChange={(e) => setinfo({ name: e.target.value })}
            />
            <label htmlFor="password" className="font-montserrat text-[10px] font-semibold mt-5 text-blue ">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="border border-primary focus:border-sky-800  focus:outline-none  p-1 " 
              value={info.password}
              onChange={(e)=>{setinfo({password: e.target.value})}} 
            />
             <div className="mt-2">
    <a href="/forgot-password" className="text-[10px] text-blue font-semibold  hover:underline">
      Forgot password?
    </a>
  </div>
            <input 
              type="submit" 
              value="Sign In" 
              className="bg-primary hover:bg-sky-800 flex font-montserrat font-semibold justify-center p-1 font-montserrat text-white mt-5 rounded-md" 
            />
          </form>
      </div>
      </div>
    </div>
  )
}

export default Login
