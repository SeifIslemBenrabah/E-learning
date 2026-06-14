import React, { useEffect, useState, useRef } from 'react'
import { AuthData } from '../../Auth/AuthContext'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const Course = () => {
  const { user } = AuthData()
  const inputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const [listmodules, setListModules] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({ Name: '', Description: '', moduleId: '' })

  const fetchModules = async () => {
    try {
      const res = await axios.get(`${API_URL}/modules/teacher/${user.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setListModules(res.data)
    } catch (err) {
      console.log('Fetch error:', err)
    }
  }

  useEffect(() => {
    if (user?.id) fetchModules()
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: name === 'moduleId' ? Number(value) : value })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData()
      data.append('Name', formData.Name)
      data.append('Description', formData.Description)
      data.append('moduleId', formData.moduleId)
      files.forEach((file) => data.append('files', file))

      if (editId) {
        await axios.put(`${API_URL}/cours/${editId}`, data, {
          headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'multipart/form-data' },
        })
      } else {
        await axios.post(`${API_URL}/cours`, data, {
          headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'multipart/form-data' },
        })
      }
      setIsOpen(false)
      setFormData({ Name: '', Description: '', moduleId: '' })
      setFiles([])
      setEditId(null)
      fetchModules()
    } catch (err) {
      console.log('Save error:', err)
    }
  }

  const handleEdit = (cour) => {
    setFormData({ Name: cour.Name, Description: cour.Description || '', moduleId: cour.moduleId })
    setEditId(cour.id)
    setIsOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return
    try {
      await axios.delete(`${API_URL}/cours/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      fetchModules()
    } catch (err) {
      console.log('Delete error:', err)
    }
  }

  const handlePdfClick = async (fileId) => {
    try {
      const res = await axios.get(`${API_URL}/files/${fileId}`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.log('Download error:', err)
    }
  }

  const handleFileDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files)])
    }
  }

  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx))

  const openModal = (moduleId) => {
    setEditId(null)
    setFiles([])
    setFormData({ Name: '', Description: '', moduleId })
    setIsOpen(true)
  }

  return (
    <div className='w-full min-h-screen bg-bluebg'>

      {isOpen && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50'>
          <div className='bg-white p-6 rounded-xl w-[480px] shadow-lg'>
            <h2 className='text-lg font-bold mb-4'>{editId ? 'Edit Course' : 'Add Course'}</h2>
            <form onSubmit={handleSave} className='flex flex-col gap-3'>
              <input type='text' name='Name' placeholder='Course Name'
                value={formData.Name} onChange={handleChange}
                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' required />
              <input type='text' name='Description' placeholder='Description'
                value={formData.Description} onChange={handleChange}
                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' />

              {/* File drop zone */}
              <div
                onDragEnter={(e) => { e.preventDefault(); setDragActive(true) }}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                onDragLeave={(e) => { e.preventDefault(); setDragActive(false) }}
                onDrop={handleFileDrop}
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${dragActive ? 'border-primary bg-bluebg' : 'border-gray-200'}`}
              >
                <input ref={inputRef} type='file' multiple className='hidden'
                  onChange={handleFileInput}
                  accept='.pdf,.doc,.docx,.ppt,.pptx,.txt,.xlsx,.xls,image/*' />
                <p className='text-sm text-gray'>
                  Drag & drop files or{' '}
                  <span className='text-primary font-semibold cursor-pointer underline'
                    onClick={() => { inputRef.current.value = ''; inputRef.current.click() }}>
                    browse
                  </span>
                </p>
                {files.length > 0 && (
                  <div className='mt-2 flex flex-col gap-1'>
                    {files.map((f, i) => (
                      <div key={i} className='flex justify-between items-center text-xs bg-bluebg rounded px-2 py-1'>
                        <span>{f.name}</span>
                        <button type='button' onClick={() => removeFile(i)} className='text-red-500 ml-2'>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className='flex justify-end gap-3 mt-2'>
                <button type='button' onClick={() => setIsOpen(false)} className='px-4 py-2 bg-gray-100 rounded-lg text-sm'>Cancel</button>
                <button type='submit' className='px-4 py-2 bg-primary text-white rounded-lg text-sm'>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className='px-7 py-6'>
        <h1 className='text-2xl font-bold text-blue mb-6'>My Courses</h1>
        {listmodules.length === 0 && (
          <p className='text-gray text-sm'>No modules assigned to you yet.</p>
        )}
        {listmodules.map((m) => (
          <div key={m.id} className='mb-8'>
            <h2 className='text-lg font-semibold text-blue mb-3'>{m.Name}</h2>
            <div className='grid grid-cols-3 gap-4'>
              {m.Cours?.map((c) => (
                <div key={c.id} className='flex flex-col bg-white shadow-sm rounded-xl px-5 py-4 gap-2'>
                  <p className='font-semibold text-blue'>{c.Name}</p>
                  <p className='text-gray text-xs'>{c.Description}</p>
                  {c.Files?.map((f) => (
                    <button key={f.id} onClick={() => handlePdfClick(f.id)}
                      className='text-primary text-xs text-left hover:underline'>
                      📄 {f.name}
                    </button>
                  ))}
                  <div className='flex flex-row justify-between items-center mt-2'>
                    <button onClick={() => handleEdit(c)}
                      className='bg-primary text-white text-xs px-3 py-1.5 rounded-lg'>Edit</button>
                    <button onClick={() => handleDelete(c.id)}
                      className='border border-red-500 text-red-500 text-xs px-3 py-1.5 rounded-lg'>Delete</button>
                  </div>
                </div>
              ))}
              <div className='flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-white rounded-xl py-6 gap-2 cursor-pointer hover:border-primary transition-colors'
                onClick={() => openModal(m.id)}>
                <div className='p-3 bg-bluebg rounded-full'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 text-primary'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                  </svg>
                </div>
                <p className='text-sm text-gray'>Add Course</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Course
