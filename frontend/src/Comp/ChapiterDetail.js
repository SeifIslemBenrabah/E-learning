import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthData } from '../Auth/AuthContext'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const ChapiterDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = AuthData()
  const [cour, setCour] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API_URL}/cours/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => setCour(res.data))
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

  if (!cour) {
    return (
      <div className='w-full min-h-screen bg-bluebg flex items-center justify-center'>
        <p className='text-gray'>Chapter not found.</p>
      </div>
    )
  }

  const files = cour.Files || []

  return (
    <div className='w-full min-h-screen bg-bluebg'>
      <div className='px-8 py-6'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-6'>
          <button onClick={() => navigate(-1)}
            className='text-gray hover:text-blue transition-colors'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' />
            </svg>
          </button>
          <div>
            <h1 className='text-2xl font-bold text-blue'>{cour.Name}</h1>
            {cour.Description && (
              <p className='text-sm text-gray mt-0.5'>{cour.Description}</p>
            )}
          </div>
        </div>

        {/* Files card */}
        <div className='bg-white rounded-xl shadow-sm'>
          <div className='px-5 py-4 border-b border-gray-100 flex items-center justify-between'>
            <div>
              <h2 className='font-semibold text-blue'>Course Files</h2>
              <p className='text-xs text-gray mt-0.5'>{files.length} file{files.length !== 1 ? 's' : ''} available</p>
            </div>
          </div>

          {files.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-16 gap-3'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-12 h-12 text-gray-300'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z' />
              </svg>
              <p className='text-gray font-medium'>No files uploaded yet</p>
              <p className='text-xs text-gray'>The teacher hasn't uploaded files for this chapter.</p>
            </div>
          ) : (
            <ul>
              {files.map((file, index) => (
                <li key={file.id}
                  className={`flex items-center gap-4 px-5 py-4 ${index < files.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className='h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 text-primary'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z' />
                    </svg>
                  </div>
                  <p className='flex-1 font-medium text-blue text-sm truncate'>{file.name}</p>
                  <a href={`${API_URL}/${file.link}`} target='_blank' rel='noreferrer'
                    className='flex items-center gap-2 bg-primary text-white text-xs font-medium px-3 py-2 rounded-xl hover:opacity-90 transition-opacity shrink-0'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-4 h-4'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3' />
                    </svg>
                    Download
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChapiterDetail
