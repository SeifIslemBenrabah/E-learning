import axios from 'axios'
import React,{useEffect,useState} from 'react'
import one from '../assets/one.png'
import esilogin from '../assets/esilogin.png'
const HomePageStudent = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [listteachers, setlistteachers] = useState([]);
    useEffect(()=>{
        const fatchTeachers = async()=>{
            try{
                const res = await axios.get(`http://localhost:8080/user/student`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                setlistteachers(res.data)
            }
            catch(err){
                console.log('err:',err)
            }
        };
        fatchTeachers();
    },[])

  return (
    <div className='w-full flex flex-col bg-bluebg -z-40'>
        <div className=' fixed w-10/12 h-12 bg-white flex flex-row items-center justify-between px-6'>
            <p className='font-semibold text-gray'>Welcome Back,Mr Azza !</p>
            <div className='flex flex-row gap-1 items-center'>
            <div className='h-8 w-8 rounded-full overflow-hidden'>
                <img src={one}/>
            </div>
            <div className='text-[10px]'>
            <p className='font-semibold'>Bensaber</p>
            <p>Role</p>
            </div>
            <button className='border-[0.2px] border-blue rounded-full flex ml-2 p-[2px] pt-[2.5px] items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>

            </button>
        </div>
        </div>
        <div className='w-full flex-grow mt-12 flex flex-row pl-7 pr-5 pt-4 gap-5'>
            <div className='h-full w-2/3 flex flex-col items-start gap-4'>
            <p className=' text-gray'>My Courses</p>
            <div className='w-full grid grid-cols-3 gap-5'>
              <div className='bg-white px-2 pt-2 pb-4 shadow-md rounded-md flex flex-col items-center gap-2 font-light overflow-hidden'>
                <div className='w-11/12 h-20 flex items-center bg-amber-300 overflow-hidden rounded-md'>
              <img src={esilogin} className='h-20'/>
              </div>
              <p>Operating System</p>
              </div>

              <a href='/student/module/1' className='bg-white px-2 pt-2 pb-4 shadow-md rounded-md flex flex-col items-center gap-2 font-light overflow-hidden'>
              <div className='w-11/12 h-20 flex items-center bg-amber-300 overflow-hidden rounded-md'>
              <img src={esilogin} className='h-20'/>
              </div>
              <p>Reseaux 2</p>
              </a>

              <div className='bg-white px-2 pt-2 pb-4 shadow-md rounded-md flex flex-col items-center gap-2 font-light overflow-hidden'>
              <div className='w-11/12 h-20 flex items-center bg-amber-300 overflow-hidden rounded-md'>
              <img src={esilogin} className='h-20'/>
              </div>
              <p>Operating System</p>
              </div>
            </div>
            </div>
            <div className=' fixed top-28 right-5 h-5/6 w-[270px] z-50'>
            <div className='w-full  rounded-md text-white gap-4 bg-red-500/35 flex flex-col items-start px-5 py-2 pb-6 shadow-md'>
            <div className='flex flex-row gap-2 items-center mt-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <p className='font-bold text-lg'>Remainder</p>
            </div>
            <p className='text-sm font-light'>Assignment Deadline Reminder: The deadline for Tp socket is  approaching. Would you like to extend the deadline? </p>
            <div className=' w-full flex flex-row justify-between items-center text-sm'>
                <button className='font-semibold'>Edit</button>
                <button className='font-light'>Cancel</button>
            </div>
            </div>
            <div className='flex flex-col w-full items-start mt-5 gap-3'>
                <div className='w-full flex flex-row justify-between items-center'>
                    <p className='text-lg font-semibold'>Chat</p>
                    <button className='font-light text-sm text-green-500'>View All</button>
                </div>
                <div className='w-full border-l-8 border-green-500 flex flex-row items-center justify-between rounded-md px-4 py-2'>
                    <div className='flex flex-row gap-2 items-center'>
                <div className='h-8 w-8 rounded-full overflow-hidden'>
                <img src={one}/>
            </div>
            <p>Benrabah Seif Islem</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-green-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>

                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default HomePageStudent
