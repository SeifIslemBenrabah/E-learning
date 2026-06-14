import React, { useEffect, useState } from 'react'
import { AuthData } from '../../Auth/AuthContext'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const Resources = () => {
  const { user } = AuthData()
  const [listmodules, setListModules] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({ Name: '', Link: '', Type: '', moduleId: '' })

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
      if (editId) {
        await axios.put(`${API_URL}/resources/${editId}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
      } else {
        await axios.post(`${API_URL}/resources`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
      }
      setIsOpen(false)
      setFormData({ Name: '', Link: '', Type: '', moduleId: '' })
      setEditId(null)
      fetchModules()
    } catch (err) {
      console.log('Save error:', err)
    }
  }

  const handleEdit = (r) => {
    setFormData({ Name: r.Name, Link: r.Link, Type: r.Type, moduleId: r.moduleId })
    setEditId(r.id)
    setIsOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/resources/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      fetchModules()
    } catch (err) {
      console.log('Delete error:', err)
    }
  }

  const typeIcon = (type) => {
    const icons = {
      Youtube: '▶',
      Website: '🌐',
      Book: '📚',
      Playlist: '🎵',
    }
    return icons[type] || '🔗'
  }

  return (
    <div className='w-full min-h-screen bg-bluebg'>

      {isOpen && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50'>
          <div className='bg-white p-6 rounded-xl w-96 shadow-lg'>
            <h2 className='text-lg font-bold mb-4'>{editId ? 'Edit Resource' : 'Add Resource'}</h2>
            <form onSubmit={handleSave} className='flex flex-col gap-3'>
              <input type='text' name='Name' placeholder='Resource Name'
                value={formData.Name} onChange={handleChange}
                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' required />
              <select name='Type' value={formData.Type} onChange={handleChange}
                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary'>
                <option value=''>Select Type</option>
                <option value='Website'>Website</option>
                <option value='Playlist'>Playlist</option>
                <option value='Book'>Book</option>
                <option value='Youtube'>Youtube</option>
              </select>
              <input type='text' name='Link' placeholder='Link (URL)'
                value={formData.Link} onChange={handleChange}
                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' />
              <div className='flex justify-end gap-3 mt-2'>
                <button type='button' onClick={() => setIsOpen(false)} className='px-4 py-2 bg-gray-100 rounded-lg text-sm'>Cancel</button>
                <button type='submit' className='px-4 py-2 bg-primary text-white rounded-lg text-sm'>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className='px-7 py-6'>
        <h1 className='text-2xl font-bold text-blue mb-6'>Resources</h1>
        {listmodules.length === 0 && (
          <p className='text-gray text-sm'>No modules assigned to you yet.</p>
        )}
        {listmodules.map((m) => (
          <div key={m.id} className='mb-8'>
            <h2 className='text-lg font-semibold text-blue mb-3'>{m.Name}</h2>
            <div className='grid grid-cols-3 gap-4'>
              {m.Resources?.map((r) => (
                <div key={r.id} className='relative flex flex-col bg-white shadow-sm rounded-xl overflow-hidden'>
                  <div className='bg-primary px-5 py-4 text-white text-xs font-light break-all'>{r.Link}</div>
                  <div className='absolute top-2 right-2 bg-blue text-white text-xs rounded-full p-1.5'>
                    {typeIcon(r.Type)}
                  </div>
                  <div className='px-5 py-3 flex flex-col gap-3 flex-1'>
                    <p className='text-sm font-medium text-blue'>{r.Name}</p>
                    <span className='text-xs text-gray bg-bluebg px-2 py-0.5 rounded-full self-start'>{r.Type}</span>
                    <div className='flex flex-row justify-between items-center mt-auto'>
                      <button onClick={() => window.open(r.Link, '_blank')}
                        className='bg-primary text-white text-xs px-3 py-1.5 rounded-lg'>View</button>
                      <button onClick={() => handleEdit(r)}
                        className='border border-primary text-primary text-xs px-3 py-1.5 rounded-lg'>Edit</button>
                      <button onClick={() => handleDelete(r.id)}
                        className='border border-red-500 text-red-500 text-xs px-3 py-1.5 rounded-lg'>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className='flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-white rounded-xl py-6 gap-2 cursor-pointer hover:border-primary transition-colors'
                onClick={() => {
                  setIsOpen(true)
                  setEditId(null)
                  setFormData({ Name: '', Link: '', Type: '', moduleId: m.id })
                }}>
                <div className='p-3 bg-bluebg rounded-full'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 text-primary'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                  </svg>
                </div>
                <p className='text-sm text-gray'>Add Resource</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Resources
