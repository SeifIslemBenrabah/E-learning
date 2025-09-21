import axios from 'axios'
import React,{useEffect,useState} from 'react'
import one from '../../assets/one.png'
const Inbox = () => {
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
        <div className=' fixed w-10/12 h-12 bg-white border-b-[1px] border-gray flex flex-row items-center justify-between px-6'>
        <p className='font-bold text-blue'>Inbox</p>
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
        <div className='flex flex-col mt-12 bg-white border-b-[1px] border-gray'>
        <h1 className='text-lg font-bold text-blue my-2 ml-7 '>Bensaber Djamel</h1>
        </div>
        <div className='w-full flex-grow flex flex-row pl-7 pr-5 pt-4 gap-5'>
            <div className='h-full w-2/3 flex flex-col items-start gap-4'>

            </div>
            <div className=' fixed bg-white flex flex-col items-center border-l-[1px] border-gray top-12 right-0 h-full w-[270px] z-50 pt-10'>
                <button className='w-1/2 bg-primary text-white flex flex-row items-center justify-center py-2 rounded-lg gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                </svg>
                Create
                </button>
                <div className='w-2/3 flex items-start text-lg text-blue font-semibold my-5'>
                <p>Messages</p>
                </div>
                <div className='bg-slate-50 border-gray border-[1px] p-1 shadow-sm rounded-lg flex items-center gap-2 text-gray-700'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" />
  </svg>
  <input
    type="text"
    placeholder="Search..."
    className="outline-none w-full text-sm placeholder:text-gray-400"
  />
                </div>
                <div className='w-full flex-grow mt-4'>
                    <button className='w-full py-1 flex flex-row px-4 items-center gap-3'>
                        <div className='h-10 w-10 rounded-full overflow-hidden'>
                            <img src={one} />
                        </div>
                        <div className=' w-1/2 flex flex-col items-start '>
                            <p className='font-semibold text-sm'>Bensaber djamel</p>
                            <p className='text-sm text-gray truncate overflow-hidden whitespace-nowrap w-full'> This is a very long text that will be truncated with an ellipsis.</p>
                        </div>
                        <div className=' flex flex-col  gap-[10px]'>
                            <p className='text-xs'>10:12</p>
                            <p className='text-sm text-gray truncate overflow-hidden whitespace-nowrap w-full'>
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M5.801 4.87976L6.507 5.58576L10.74 1.35276L11.447 2.05976L6.507 6.99976L3.325 3.81776L4.032 3.11076L5.0945 4.17326L5.801 4.87926V4.87976ZM5.802 3.46576L8.278 0.989258L8.983 1.69426L6.507 4.17076L5.802 3.46576ZM4.3885 6.29326L3.682 6.99976L0.5 3.81776L1.207 3.11076L1.9135 3.81726L1.913 3.81776L4.3885 6.29326Z" fill="#27AE60"/>
                            </svg>
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Inbox