import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { AuthData } from '../Auth/AuthContext'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const typeIcon = (type) => {
  if (type === 'Youtube') return '▶'
  if (type === 'Website') return '🌐'
  if (type === 'Book') return '📚'
  if (type === 'Playlist') return '🎵'
  return '🔗'
}

const CourQuizzes = ({ cour, user }) => {
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/quiz/course/${cour.id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => setQuizzes(res.data))
      .catch(() => {})
  }, [cour.id, user.token])

  if (quizzes.length === 0) return null

  return (
    <div className='bg-white rounded-xl shadow-sm px-5 py-4'>
      <p className='text-xs font-semibold text-gray uppercase tracking-wide mb-3'>{cour.Name}</p>
      <div className='flex flex-col gap-2'>
        {quizzes.map(quiz => (
          <div key={quiz.id} className='flex items-center justify-between bg-bluebg rounded-xl px-4 py-3'>
            <div>
              <p className='font-semibold text-blue text-sm'>{quiz.title}</p>
              <p className='text-xs text-gray mt-0.5'>{quiz.Questions?.length || 0} questions</p>
            </div>
            <span className='bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-xl'>
              Coming soon
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const ModuleDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = AuthData()
  const [module, setModule] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Documents')

  useEffect(() => {
    axios.get(`${API_URL}/modules/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => setModule(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id, user.token])

  if (loading) {
    return (
      <div className='w-full min-h-screen bg-bluebg flex items-center justify-center'>
        <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
      </div>
    )
  }

  if (!module) {
    return (
      <div className='w-full min-h-screen bg-bluebg flex items-center justify-center'>
        <p className='text-gray'>Module not found.</p>
      </div>
    )
  }

  const cours = module.Cours || []
  const resources = module.Resources || []
  const tabs = ['Documents', 'Resources', 'Quiz']

  return (
    <div className='w-full min-h-screen bg-bluebg'>
      <div className='px-8 py-6'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-6'>
          <button onClick={() => navigate('/student/Home')}
            className='text-gray hover:text-blue transition-colors'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' />
            </svg>
          </button>
          <div className='flex-1'>
            <h1 className='text-2xl font-bold text-blue'>{module.Name}</h1>
            {module.Description && (
              <p className='text-sm text-gray mt-0.5'>{module.Description}</p>
            )}
          </div>
          {module.Grade && (
            <span className='bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full'>
              {module.Grade.name}
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className='flex gap-1 border-b border-gray-200 mb-6'>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray hover:text-blue'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Documents tab */}
        {activeTab === 'Documents' && (
          <div className='flex flex-col gap-3'>
            {cours.length === 0 ? (
              <div className='bg-white rounded-xl shadow-sm flex flex-col items-center justify-center py-16 gap-3'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-12 h-12 text-gray-300'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z' />
                </svg>
                <p className='text-gray font-medium'>No chapters yet</p>
              </div>
            ) : cours.map(cour => (
              <Link key={cour.id} to={`/student/chapiter/${cour.id}`}
                className='bg-white rounded-xl shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow'>
                <div className='h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 text-primary'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z' />
                  </svg>
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='font-semibold text-blue text-sm'>{cour.Name}</p>
                  {cour.Description && (
                    <p className='text-xs text-gray mt-0.5 truncate'>{cour.Description}</p>
                  )}
                </div>
                <span className='text-xs text-gray shrink-0'>{cour.Files?.length || 0} files</span>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-4 h-4 text-gray shrink-0'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            ))}
          </div>
        )}

        {/* Resources tab */}
        {activeTab === 'Resources' && (
          <div className='flex flex-col gap-3'>
            {resources.length === 0 ? (
              <div className='bg-white rounded-xl shadow-sm flex flex-col items-center justify-center py-16 gap-3'>
                <p className='text-gray font-medium'>No resources yet</p>
              </div>
            ) : resources.map(res => (
              <a key={res.id} href={res.Link} target='_blank' rel='noreferrer'
                className='bg-white rounded-xl shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow'>
                <div className='h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-lg'>
                  {typeIcon(res.Type)}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='font-semibold text-blue text-sm'>{res.Name}</p>
                  <p className='text-xs text-gray mt-0.5 truncate'>{res.Link}</p>
                </div>
                <span className='text-xs bg-bluebg text-primary px-2 py-0.5 rounded-full shrink-0'>{res.Type}</span>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-4 h-4 text-gray shrink-0'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25' />
                </svg>
              </a>
            ))}
          </div>
        )}

        {/* Quiz tab */}
        {activeTab === 'Quiz' && (
          <div className='flex flex-col gap-3'>
            {cours.length === 0 ? (
              <div className='bg-white rounded-xl shadow-sm flex flex-col items-center justify-center py-16 gap-3'>
                <p className='text-gray font-medium'>No quizzes yet</p>
              </div>
            ) : cours.map(cour => (
              <CourQuizzes key={cour.id} cour={cour} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ModuleDetail
