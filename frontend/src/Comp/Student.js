import React, { useRef, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AuthData } from '../Auth/AuthContext'
import one from '../assets/one.png'

const Student = () => {
  const { user, logout } = AuthData()
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const popupRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinks = [
    {
      to: '/student/Home',
      label: 'My Courses',
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
          <path d='M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z' />
          <path d='M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.71 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 0 1 13 15.474l.06-.001Z' />
        </svg>
      )
    },
    {
      to: '/student/Quizzes',
      label: 'My Quizzes',
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
          <path fillRule='evenodd' d='M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 1 1-9 0V4.125Zm4.5 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z' clipRule='evenodd' />
          <path d='M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257ZM12.738 17.625l6.474-6.474a1.875 1.875 0 0 0 0-2.651L15.5 4.787a1.875 1.875 0 0 0-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375Z' />
        </svg>
      )
    },
    {
      to: '/student/Inbox',
      label: 'Inbox',
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
          <path d='M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z' />
          <path d='M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z' />
        </svg>
      )
    }
  ]

  return (
    <div className='flex h-screen bg-bluebg'>
      {/* Sidebar */}
      <aside className='fixed top-0 left-0 h-screen w-56 bg-white shadow-lg flex flex-col z-50'>
        <div className='px-6 pt-6 pb-4 border-b border-gray-100'>
          <p className='font-bold text-blue text-xl'>ESILearn</p>
          <p className='text-xs text-gray mt-0.5'>Student Portal</p>
        </div>

        <nav className='flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto'>
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-blue hover:bg-bluebg'
                }`
              }>
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* User profile + logout */}
        <div className='px-3 pb-4 relative'>
          {showPopup && (
            <div ref={popupRef}
              className='absolute bottom-16 left-3 right-3 bg-white border border-gray-100 rounded-xl shadow-lg p-3 z-10'>
              <p className='text-xs text-gray mb-2 truncate'>{user?.email}</p>
              <button onClick={handleLogout}
                className='w-full text-left text-sm text-red-500 hover:text-red-700 font-medium py-1'>
                Sign out
              </button>
            </div>
          )}
          <button onClick={() => setShowPopup(p => !p)}
            className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-bluebg transition-colors'>
            <div className='h-8 w-8 rounded-full overflow-hidden shrink-0'>
              <img src={one} alt='avatar' className='w-full h-full object-cover' />
            </div>
            <div className='flex-1 text-left min-w-0'>
              <p className='text-sm font-semibold text-blue truncate'>{user?.firstName} {user?.lastName}</p>
              <p className='text-xs text-gray truncate'>Student</p>
            </div>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-4 h-4 text-gray shrink-0'>
              <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className='ml-56 flex-1 overflow-y-auto'>
        <Outlet />
      </main>
    </div>
  )
}

export default Student
