import React from 'react'
import { AuthData } from '../../Auth/AuthContext'
import one from '../../assets/one.png'

const DashboardTeacher = () => {
  const { user } = AuthData()

  return (
    <div className='w-full min-h-screen bg-bluebg'>
      <div className='px-8 py-6'>
        <h1 className='text-2xl font-bold text-blue mb-6'>Welcome back, {user?.firstName} {user?.lastName}</h1>

        {/* Quick action cards */}
        <div className='grid grid-cols-2 gap-6 mb-6'>
          <div className='bg-white border-l-4 border-blue rounded-xl flex flex-row py-5 px-6 justify-between items-center shadow-sm'>
            <div className='flex flex-col gap-1'>
              <p className='text-blue font-light text-sm'>Add Chapter / TD</p>
              <p className='text-xs text-gray'>Upload a new course chapter</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-blue">
              <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z" clipRule="evenodd" />
              <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
            </svg>
          </div>

          <div className='bg-white border-l-4 border-primary rounded-xl flex flex-row py-5 px-6 justify-between items-center shadow-sm'>
            <div className='flex flex-col gap-1'>
              <p className='text-blue font-light text-sm'>Add Mooc / Video</p>
              <p className='text-xs text-gray'>Upload a video resource</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-primary">
              <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
            </svg>
          </div>
        </div>

        {/* Learning activities */}
        <h2 className='text-sm font-semibold text-gray mb-3'>Learning Activities</h2>
        <div className='grid grid-cols-2 gap-6 mb-6'>
          <div className='bg-white border-t-4 border-blue rounded-xl flex flex-col py-4 px-5 shadow-sm gap-2'>
            <p className='text-blue font-medium'>Add Quiz</p>
            <p className='text-gray text-xs'>Create a quiz to evaluate your students.</p>
            <div className='flex items-center justify-center mt-2'>
              <button className='bg-primary px-6 py-2 rounded-lg text-white text-sm'>Create</button>
            </div>
          </div>
          <div className='bg-white border-t-4 border-primary rounded-xl flex flex-col py-4 px-5 shadow-sm gap-2'>
            <p className='text-blue font-medium'>Add Assignment</p>
            <p className='text-gray text-xs'>Create a homework assignment for students.</p>
            <div className='flex items-center justify-center mt-2'>
              <button className='bg-primary px-6 py-2 rounded-lg text-white text-sm'>Create</button>
            </div>
          </div>
        </div>

        {/* Chat / reminder */}
        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-2 bg-white rounded-xl shadow-sm px-6 py-4'>
            <p className='font-semibold text-blue mb-3'>Add Communication Space</p>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='flex justify-center items-center border border-blue rounded-lg p-1'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 text-blue'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                  </svg>
                </div>
                <p className='font-light text-blue text-sm'>Create a group chat for your class</p>
              </div>
              <button className='bg-primary text-white font-semibold px-5 text-sm py-2 rounded-lg'>Add</button>
            </div>
          </div>

          <div className='bg-red-500/20 rounded-xl flex flex-col px-5 py-4 gap-3 shadow-sm'>
            <div className='flex flex-row gap-2 items-center text-red-600'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z' />
              </svg>
              <p className='font-bold'>Reminder</p>
            </div>
            <p className='text-sm font-light text-red-800'>Assignment deadline approaching. Would you like to extend it?</p>
            <div className='flex flex-row justify-between text-sm text-red-700'>
              <button className='font-semibold'>Edit</button>
              <button className='font-light'>Dismiss</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardTeacher
