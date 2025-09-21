import React from 'react'
import one from '../../assets/one.png'

import esilogin from '../../assets/esilogin.png'
const Moocs = () => {
    
  return (
    <div className='w-full flex flex-col bg-bluebg '>
    <div className=' fixed w-10/12 h-12 bg-white flex flex-row items-center justify-between px-6'>
        <p className='font-bold text-blue'>My Moocs</p>
        <div className='flex flex-row gap-1 items-center'>
        <div className='h-8 w-8 rounded-full overflow-hidden'>
            <img src={one}/>
        </div>
        <div className='text-[10px]'>
        <p className='font-semibold'>Azza</p>
        <p>Role</p>
        </div>
        <button className='border-[0.2px] border-blue rounded-full flex ml-2 p-[2px] pt-[2.5px] items-center justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-2">
<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>

        </button>
    </div>
    </div>
    <div className='flex flex-col my-14 px-7'>
      <div>
        <div className='w-full flex flex-row items-center justify-between'>
      <h1 className='text-xl font-medium text-blue mt-4'>Reseaux 2</h1>
        </div>
      <div className='grid grid-cols-3 ml-4 gap-3 mt-1'>
        <div className='flex flex-col items-center px-8 bg-white shadow-md rounded-md py-4 gap-2'>
            <div className='w-full rounded-lg shadow-md overflow-hidden'><img className='' src={esilogin}/></div>
            <p className='text-gray text-sm'>A meeting to answer your questions about sockets and provide some examples to help you better understand.</p>
        <div className='flex flex-row justify-between w-full items-center mt-2'>
          <button className='bg-primary border-[1px] border-primary text-white font-light text-xs px-2 py-1 rounded-sm'>View</button>
          <button className='border-[1px] border-red-600 text-red-600 font-light text-xs px-1.5 py-1 rounded-sm'>Delete</button>
        </div>
        </div>

        <div className='flex flex-col items-center px-8 bg-white shadow-md rounded-md py-4 gap-2'>
            <div className='w-full rounded-lg shadow-md overflow-hidden'><img className='' src={esilogin}/></div>
            <p className='text-gray text-sm'>A meeting to answer your questions about sockets and provide some examples to help you better understand.</p>
        <div className='flex flex-row justify-between w-full items-center mt-2'>
          <button className='bg-primary border-[1px] border-primary text-white font-light text-xs px-2 py-1 rounded-sm'>View</button>
          <button className='border-[1px] border-red-600 text-red-600 font-light text-xs px-1.5 py-1 rounded-sm'>Delete</button>
        </div>
        </div>

        <div className='flex flex-col items-center px-8 bg-white shadow-md rounded-md py-4 gap-2'>
            <div className='w-full rounded-lg shadow-md overflow-hidden'><img className='' src={esilogin}/></div>
            <p className='text-gray text-sm'>A meeting to answer your questions about sockets and provide some examples to help you better understand.</p>
        <div className='flex flex-row justify-between w-full items-center mt-2'>
          <button className='bg-primary border-[1px] border-primary text-white font-light text-xs px-2 py-1 rounded-sm'>View</button>
          <button className='border-[1px] border-red-600 text-red-600 font-light text-xs px-1.5 py-1 rounded-sm'>Delete</button>
        </div>
        </div>
        <div className='flex flex-col items-center px-8 bg-white shadow-md rounded-md py-4 gap-2'>
            <div className='w-full rounded-lg shadow-md overflow-hidden'><img className='' src={esilogin}/></div>
            <p className='text-gray text-sm'>A meeting to answer your questions about sockets and provide some examples to help you better understand.</p>
        <div className='flex flex-row justify-between w-full items-center mt-2'>
          <button className='bg-primary border-[1px] border-primary text-white font-light text-xs px-2 py-1 rounded-sm'>View</button>
          <button className='border-[1px] border-red-600 text-red-600 font-light text-xs px-1.5 py-1 rounded-sm'>Delete</button>
        </div>
        </div>
        <div className='flex flex-col items-center justify-center px-8 bg-white shadow-md rounded-md py-4 gap-2'>
        <p>Add New Chapter</p>
        <div className='flex-grow flex items-center justify-center pb-4'>
        <button className='flex  items-center justify-center p-4 bg-gray/40 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        </button>
        </div>
        </div>
      </div>
      </div>




      <div>
        <div className='w-full flex flex-row items-center justify-between'>
      <h1 className='text-xl font-medium text-blue mt-4'>Reseaux 2</h1>
        </div>
      <div className='grid grid-cols-3 ml-4 gap-4 mt-4'>
      <div className='flex flex-col items-center px-8 bg-white shadow-md rounded-md py-4 gap-2'>
            <div className='w-full rounded-lg shadow-md overflow-hidden'><img className='' src={esilogin}/></div>
            <p className='text-gray text-sm'>A meeting to answer your questions about sockets and provide some examples to help you better understand.</p>
        <div className='flex flex-row justify-between w-full items-center mt-2'>
          <button className='bg-primary border-[1px] border-primary text-white font-light text-xs px-2 py-1 rounded-sm'>View</button>
          <button className='border-[1px] border-red-600 text-red-600 font-light text-xs px-1.5 py-1 rounded-sm'>Delete</button>
        </div>
        </div>  
        <div className='flex flex-col items-center justify-center px-8 bg-white shadow-md rounded-md py-4 gap-2'>
        <p>Add New Chapter</p>
        <div className='flex-grow flex items-center justify-center pb-4'>
        <button className='flex  items-center justify-center p-4 bg-gray/40 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        </button>
        </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Moocs
