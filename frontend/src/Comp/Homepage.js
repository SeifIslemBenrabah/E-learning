import React from 'react'
import one from '../assets/one.png'
import duolingo from '../assets/duolingo.png'
import Magic from '../assets/Magic.png'
import Codecov from '../assets/Codecov.png'
import UserTesting from '../assets/UserTesting.png'
const Homepage = () => {
  return (
    <div className='w-full absolute'>
      <div className='flex items-center'>
      {/* <div className='relative top-2 flex flex-row justify-between mx-16 items-center '>
        <div className='font-roboto font-bold text-3xl'>
          Logo
        </div>
        <div className='flex flex-row gap-5 items-center'>
          <h1 className='font-roboto  text-lg'>How it work?</h1>
          <h1 className='font-roboto text-lg'>About Us</h1>
          <h1 className='font-roboto text-lg'>Features</h1>
          <a href='/Login' className='font-roboto text-primary text-lg bg-white px-4 py-2 rounded-3xl shadow-xl'>
            Login
          </a>
        </div>
      </div> */}
      <div className='flex h-screen flex-row w-full justify-center items-center'>
        <div>
        <div className='flex mx-5 flex-row w-full justify-between items-center'>
        <div className='flex flex-col gap-6 items-start'>
          <p className='font-inter font-bold text-5xl'>
          Up your <span className='text-primary'>Skills</span><br/>
          To <span className='text-primary'>Advance</span> your<br/> <span className='text-primary'>Career </span>path
          </p>
          <p className='text-gray'>
          Learn Computer Science skills through the latest online <br/>learning system and resources to help your knowledge grow.
          </p>
          <a href='/Login' className='bg-primary text-white px-3 py-2 font-medium rounded-md'>Get Started</a>
        </div>
        <div className='relative'>
          <div className='absolute bg-slate-200 rounded-lg top-1/2 gap-2 -left-10 flex flex-row p-2 border-[0.5px] border-primary'>
          <div className='bg-primary text-white p-3 rounded-lg flex justify-center items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
</svg>
          </div>
          <div>
          <p className='font-bold text-lg'>
            2k+
          </p>
          <p className='text-sm font-light'>Video Courses</p>
          </div>
          </div>
          <img src={one} alt='one' className='w-[400px]'/>
        </div>
      </div>
      <div className='flex flex-row w-full h-9 mt-9 items-center gap-16'>
        <div className='flex flex-col justify-start text-xl mb-2'>
          <p className='text-primary font-bold'>250+</p>
          <p className='font-light'>Collaboration</p>
        </div>
        <img src={duolingo} alt='collaboration' className='h-7 opacity-50'/>
        <img src={Codecov} alt='collaboration' className='h-7 opacity-50'/>
        <img src={UserTesting} alt='collaboration' className='h-7 opacity-50'/>
        <img src={Magic} alt='collaboration' className='h-7 opacity-50'/>
      </div>
      </div>
      </div>
      </div>
      <div className=' h-screen w-full flex flex-col items-center gap-5'>
        <p className='font-bold text-lg text-primary'>Our Study Space</p>
        <h1 className='font-bold text-3xl'>Empower Your Computer Science Journey</h1>
        <div className='flex flex-row justify-around h-1/3'>
          <div className='flex flex-col bg-slate-50 shadow-xl py-11 w-1/4  h-full  overflow-hidden px-2 rounded-lg gap-4'>
            <div className='flex flex-row items-center gap-3'>
              <div className='bg-primary/25 text-primary p-3 rounded-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
</svg>

              </div>
           <p className='text-lg font-medium'>Learning resources</p>
            </div>
            <p className='text-sm text-gray'>
            Each module includes Teaching Materials (TD), Practical Sessions (TP), and Courses (COUR).
            </p>
          </div>
          <div className='flex flex-col bg-slate-50 shadow-xl w-1/4 h-full overflow-hidden py-11 px-2 rounded-lg gap-4'>
            <div className='flex flex-row items-center gap-3'>
              <div className='bg-primary/25 text-primary p-3 rounded-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
</svg>

              </div>
           <p className='text-lg font-medium'>Learning resources</p>
            </div>
            <p className='text-sm text-gray'>
            Student spaces for resource exchange and<br/> communication promote collaboration.
            </p>
          </div>
          <div className='flex flex-col bg-slate-50 shadow-xl py-11 w-1/4 h-full overflow-hidden px-2 rounded-lg gap-4'>
            <div className='flex flex-row items-center gap-3'>
              <div className='bg-primary/25 text-primary p-3 rounded-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
</svg>

              </div>
           <p className='text-lg font-medium'>Learning resources</p>
            </div>
            <p className='text-sm text-gray'>
            Teachers can effortlessly upload quizzes,<br/> tests, assignments, and more.
            </p>
          </div>
        </div>
        <div className='bg-blue text-slate-500 h-1/3 mt-auto w-full flex flex-row items-center justify-around mx-11'>
  <div className='flex h-full items-center justify-center text-white font-bold text-3xl'>
    E-Learning
  </div>

  <div className='flex flex-col text-gray-300 h-full pt-10 gap-2'>
    <p className='font-semibold text-gray/80'>Platform</p>
    <p>Courses</p>
    <p>Resources</p>
    <p>Pricing</p>
  </div>

  <div className='flex flex-col text-gray-300 h-full pt-10 gap-2'>
    <p className='text-gray/80 font-semibold'>Company</p>
    <p>About Us</p>
    <p>Careers</p>
    <p>Contact</p>
  </div>

  <div className='flex flex-col text-gray-300 h-full pt-10 gap-2'>
    <p className='text-gray/80 font-semibold'>Support</p>
    <p>Help Center</p>
    <p>Terms of Service</p>
    <p>Privacy Policy</p>
  </div>
</div>

      </div>
    </div>
  )
}

export default Homepage
