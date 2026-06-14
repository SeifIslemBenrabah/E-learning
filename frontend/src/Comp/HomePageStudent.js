import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthData } from '../Auth/AuthContext'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const HomePageStudent = () => {
  const { user } = AuthData()
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchModules = async () => {
      try {
        // Step 1: find student record by userId to get promoId → gradeId
        let student
        try {
          const studentRes = await axios.get(`${API_URL}/student/user/${user.id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
          })
          student = studentRes.data
        } catch (err) {
          const status = err.response?.status
          if (status === 404) {
            setError('No student record found for your account. Please contact your admin.')
          } else {
            setError(`Server error while loading your profile (${status || 'network error'}).`)
          }
          return
        }

        if (!student?.Promo?.Grade?.id) {
          setError('Your student profile is missing a promo or grade. Please contact your admin.')
          return
        }

        // Step 2: fetch modules for that grade
        const modulesRes = await axios.get(`${API_URL}/modules/grade/${student.Promo.Grade.id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        })
        setModules(modulesRes.data)
      } catch (err) {
        setError('Failed to load your courses.')
      } finally {
        setLoading(false)
      }
    }
    fetchModules()
  }, [user.id, user.token])

  const teacherName = (mod) => {
    const t = mod.mainTeacher?.User
    return t ? `${t.firstName} ${t.lastName}` : 'Unknown teacher'
  }

  return (
    <div className='w-full min-h-screen bg-bluebg'>
      <div className='px-8 py-6'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-blue'>Welcome back, {user?.firstName}!</h1>
          <p className='text-sm text-gray mt-1'>Here are your enrolled courses.</p>
        </div>

        {loading && (
          <div className='flex justify-center items-center py-20'>
            <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
          </div>
        )}

        {error && (
          <div className='bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm'>{error}</div>
        )}

        {!loading && !error && modules.length === 0 && (
          <div className='bg-white rounded-xl shadow-sm flex flex-col items-center justify-center py-20 gap-3'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-12 h-12 text-gray-300'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25' />
            </svg>
            <p className='text-gray font-medium'>No courses found</p>
            <p className='text-xs text-gray'>Ask your admin to assign your promo to a grade.</p>
          </div>
        )}

        {!loading && !error && modules.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {modules.map(mod => (
              <Link key={mod.id} to={`/student/module/${mod.id}`}
                className='bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden'>
                <div className='h-24 bg-gradient-to-br from-primary to-blue flex items-center justify-center'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='white' className='w-10 h-10 opacity-70'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25' />
                  </svg>
                </div>
                <div className='px-4 py-3'>
                  <p className='font-semibold text-blue text-sm'>{mod.Name}</p>
                  {mod.Description && (
                    <p className='text-xs text-gray mt-0.5 line-clamp-2'>{mod.Description}</p>
                  )}
                  <div className='flex items-center gap-1 mt-2'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-3.5 h-3.5 text-gray shrink-0'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z' />
                    </svg>
                    <span className='text-xs text-gray truncate'>{teacherName(mod)}</span>
                    {mod.Grade && (
                      <span className='ml-auto text-xs text-primary font-medium shrink-0'>{mod.Grade.name}</span>
                    )}
                  </div>
                  <div className='flex items-center gap-3 mt-2 text-xs text-gray'>
                    <span>{mod.Cours?.length || 0} chapters</span>
                    <span>{mod.Resources?.length || 0} resources</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePageStudent
