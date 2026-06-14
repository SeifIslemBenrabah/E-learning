import React , { useState } from 'react'
import { AuthData } from "../Auth/AuthContext";
import one from '../assets/one.png'
const Navbaradmin = () => {
  const { logout, user } = AuthData();
  const [open, setOpen] = useState(false);
  return (
    <div className='w-full h-14 text-xs fixed left-0 flex flex-row  items-center px-12 justify-between  bg-slate-50 shadow-xl'>
        <div className='font-bold flex justify-center text-blue text-2xl'>
            <h1>Logo</h1>
        </div>
        <div className='flex flex-row items-center gap-4 font-semibold text-blue'>
        <a  href='/admin/Dashboard'>Dashboard</a>
        <a href='/admin/Gteachers'>Teacher Management</a>
        <a href='/admin/Gstudents'>Students Management</a>
        <a href='/admin/Gmodule'>Modules Management</a>
        <a href='/admin/Gpromo'>Class Management</a>
        <div className='flex flex-row gap-1 items-center ml-2'>
            <div className='h-8 w-8 rounded-full overflow-hidden'>
                <img src={one}/>
            </div>
            <div className='text-[10px]'>
            <p className="font-bold">{user?.firstName || "User"}</p>
            <p>{user?.role || "Role"}</p>
            </div>
            <button onClick={() => setOpen(!open)}
            className='border-[0.2px] border-blue rounded-full flex ml-2 p-[2px] pt-[2.5px] items-center justify-center'>
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
    </div>
  )
}

export default Navbaradmin
