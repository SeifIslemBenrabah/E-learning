import React from 'react'

const Assignment = () => {
  return (
    <div className='w-full min-h-screen bg-bluebg'>
      <div className='px-7 py-6'>
        <h1 className='text-2xl font-bold text-blue mb-6'>Assignments</h1>
        <div className='bg-white rounded-xl shadow-sm flex flex-col items-center justify-center py-20 gap-3'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-12 h-12 text-gray-300'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z' />
          </svg>
          <p className='text-gray font-medium'>Assignments feature coming soon</p>
          <p className='text-xs text-gray'>You'll be able to create and manage assignments here.</p>
        </div>
      </div>
    </div>
  )
}

export default Assignment
