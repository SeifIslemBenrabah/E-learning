import axios from 'axios'
import React,{useEffect,useState} from 'react'
import one from '../assets/one.png'
import esilogin from '../assets/esilogin.png'
import { Outlet, useNavigate } from 'react-router-dom'

const Detail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Documents');
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
        <div className='w-full items-center flex-grow mt-20 flex flex-col px-7 pr-5 pt-4 gap-5'>
          <div className='w-full  flex flex-row justify-between items-center'>
            <div className='h-full w-full flex flex-row items-center gap-4 text-blue'>
            <button onClick={()=>navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mt-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            </button>
            <p className='font-semibold text-xl'>Reseaux 2</p>
            </div>
            <div className='flex flex-col items-start gap-1 px-7'>
              <div className='flex flex-row items-center justify-between w-[200px]'>
                <p>Passing Percentage</p>
                <p className='text-primary'>40%</p>
              </div>
              <div className='w-[200px] h-1 bg-gray/35 flex items-start rounded-full overflow-hidden'>
                <div className='w-[80px] h-1 bg-primary'></div>
              </div>
            </div>
            </div>
            <div className="flex w-3/4 mt-4 justify-around border-b border-gray mb-6">
          {['Documents', 'MOOC', 'Quiz', 'Resources'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 mr-2 ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
            >
              {tab} page
            </button>
          ))}
        </div>
        <div className='w-5/6 bg-white h-2/3 rounded-md'>
        <Outlet/>
        </div>
        </div>
    </div>
  )
}

export default Detail
