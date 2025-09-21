import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { AuthData } from "../../Auth/AuthWrapper";
import one from '../../assets/one.png'
const DashboardTeacher = () => {
    const { logout, user } = AuthData();
    const [open, setOpen] = useState(false);
  return (
    <div className='w-full flex flex-col bg-bluebg -z-40'>
        <div className=' fixed w-10/12 h-12 bg-white flex flex-row items-center justify-between px-6'>
            <p className='font-semibold text-gray'>Welcome Back,Mr {user?.lastName || "User"} !</p>
            <div className='flex flex-row gap-1 items-center'>
            <div className='h-8 w-8 rounded-full overflow-hidden'>
                <img src={one}/>
            </div>
            <div className='text-[10px]'>
            <p className="font-bold">{user?.firstName +" "+user?.lastName || "User"}</p>
            <p>{user?.role || "Role"}</p>
            </div>
            <button  onClick={() => setOpen(!open)} className='border-[0.2px] border-blue rounded-full flex ml-2 p-[2px] pt-[2.5px] items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>

            </button>
            {open && (
            <div className="absolute top-10 right-0 bg-white shadow-md rounded-md w-28 py-2 text-sm z-50">
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        </div>

        
        <div className='flex flex-col mt-12 bg-bluebg'>
        <h1 className='text-2xl font-bold text-blue mt-4 ml-7'>Teacher Dashboard</h1>
        </div>
        <div className='w-full flex-grow flex flex-row pl-7 pr-5 pt-4 gap-5'>
            <div className='h-full w-2/3 flex flex-col items-start gap-4'>
            <p className=' text-gray'>Upload Course Materials</p>
        <div className='w-full gap-6 flex flex-row items-center justify-between'>
            <div className='w-1/2 bg-white border-l-8 border-blue flex flex-row py-3 justify-around items-center rounded-md shadow-md'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-9 text-blue">
            <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z" clip-rule="evenodd" />
            <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
            </svg>
            <div className='flex flex-col gap-2'>
                <p className='text-blue font-light'>Add Chapter/TD</p>
                <button className='bg-primary p-2 rounded-lg font-medium text-white text-sm'>Dispose</button>
            </div>
            </div>
            <div className='w-1/2 bg-white border-l-8 border-blue flex flex-row py-3 justify-around items-center rounded-md shadow-md'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-9 text-blue">
  <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
</svg>

            <div className='flex flex-col gap-2'>
                <p className='text-blue font-light'>Add Moocs</p>
                <button className='bg-primary p-2 rounded-lg font-medium text-white text-sm'>Dispose</button>
            </div>
            </div>
        </div>
            <p className=' text-gray mt-2'>Insert Resources</p>
            <div className='w-full bg-white rounded-md shadow-md flex flex-row items-center justify-between px-14 py-5'>
                <div className='flex flex-row gap-5 items-center'>
                    <div className='flex justify-center items-center border-[0.5px] border-blue rounded-md'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
</div>
<p className='font-light text-blue'>Add Resource</p>
                </div>
                <button className='bg-primary text-white font-semibold px-5 text-sm py-2 rounded-md'>Insert</button>
            </div>
            <p className=' text-gray mt-2'>Insert Resources</p>
            <div className='w-full bg-white rounded-md shadow-md flex flex-row items-center justify-between px-14 py-5'>
                <div className='flex flex-row gap-5 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                <p className='font-light text-blue'>Add Communication Space</p>
                </div>
                <button className='bg-primary text-white font-semibold px-5 text-sm py-2 rounded-md'>Add</button>
            </div>
            <p className=' text-gray mt-2'>Insert Learning Activities</p>
            <div className='w-full gap-6 flex flex-row items-center justify-between pb-8'>
            <div className='w-1/2 gap-2 bg-white border-t-8 border-blue flex flex-col py-3 items-start px-3 rounded-md shadow-md'>
                <p className='text-blue font-light'>Add Quiz</p>
                <p className='text-gray'>Create a small quiz for your students to evaluate their understanding.</p>
                <div className='w-full flex items-center justify-center mt-3'>
                <button className='bg-primary px-6 py-2 rounded-lg text-white text-sm mb-2'>Create</button>
                </div>
            </div>
            <div className='w-1/2 gap-2 bg-white border-t-8 border-blue flex flex-col py-3 items-start px-3 rounded-md shadow-md'>
                <p className='text-blue font-light'>Add Assignment</p>
                <p className='text-gray'>Create an assignment to do a homework remotly.</p>
                <div className='w-full flex items-center justify-center mt-3'>
                <button className='bg-primary px-6 py-2 rounded-lg text-white text-sm mb-2'>Create</button>
                </div>
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

export default DashboardTeacher
