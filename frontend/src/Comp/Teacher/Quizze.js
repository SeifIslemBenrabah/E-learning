import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthData } from '../../Auth/AuthContext'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const Quizze = () => {
  const { user } = AuthData()
  const [listmodules, setListModules] = useState([])

  useEffect(() => {
    if (!user?.id) return
    const fetchModules = async () => {
      try {
        const res = await axios.get(`${API_URL}/modules/teacher/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        const modulesWithQuizzes = await Promise.all(
          res.data.map(async (m) => {
            const coursWithQuizzes = await Promise.all(
              (m.Cours || []).map(async (c) => {
                try {
                  const qRes = await axios.get(`${API_URL}/quiz/course/${c.id}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                  })
                  return { ...c, Quizzes: qRes.data }
                } catch {
                  return { ...c, Quizzes: [] }
                }
              })
            )
            return { ...m, Cours: coursWithQuizzes }
          })
        )
        setListModules(modulesWithQuizzes)
      } catch (err) {
        console.log('Fetch error:', err)
      }
    }
    fetchModules()
  }, [user])

  return (
    <div className='w-full min-h-screen bg-bluebg'>
      <div className='px-7 py-6'>
        <h1 className='text-2xl font-bold text-blue mb-6'>My Quizzes</h1>

        {listmodules.length === 0 && (
          <p className='text-gray text-sm'>No modules assigned to you yet.</p>
        )}

        {listmodules.map((m) => (
          <div key={m.id} className='mb-8'>
            <h2 className='text-lg font-semibold text-blue mb-3'>{m.Name}</h2>

            {(m.Cours || []).map((c) => (
              <div key={c.id} className='mb-5'>
                <p className='text-sm font-medium text-gray mb-3 ml-1'>{c.Name}</p>
                <div className='grid grid-cols-3 gap-4'>
                  {(c.Quizzes || []).map((quiz) => (
                    <div key={quiz.id} className='flex flex-col bg-white shadow-sm rounded-xl px-5 pt-4 pb-3 gap-2'>
                      <p className='font-semibold text-blue'>{quiz.title}</p>
                      <p className='text-xs text-gray'>{quiz.Questions?.length || 0} questions</p>
                      <div className='flex flex-row gap-2 mt-2'>
                        <Link to={`/teacher/CreateQuizze?quizId=${quiz.id}&courId=${c.id}`}
                          className='bg-primary text-white text-xs px-3 py-1.5 rounded-lg'>
                          Consult
                        </Link>
                      </div>
                    </div>
                  ))}

                  {/* Add new quiz card */}
                  <Link to={`/teacher/CreateQuizze?courId=${c.id}`}
                    className='flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-white rounded-xl py-6 gap-2 hover:border-primary transition-colors'>
                    <div className='p-3 bg-bluebg rounded-full'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 text-primary'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                      </svg>
                    </div>
                    <p className='text-sm text-gray'>Add Quiz</p>
                  </Link>
                </div>
              </div>
            ))}

            {(m.Cours || []).length === 0 && (
              <p className='text-xs text-gray ml-2'>No courses in this module yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Quizze
