import axios from 'axios'
import React, { useEffect, useState } from 'react'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const emptyForm = { Name: '', Description: '', gradeId: '', teacherId: '', coTeacherIds: [] }

const Gmodule = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [listmodules, setListModules] = useState([])
    const [listteachers, setListTeachers] = useState([])
    const [listGrades, setListGrades] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState(emptyForm)

    const fetchModules = async () => {
        try {
            const res = await axios.get(`${API_URL}/modules`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            })
            setListModules(res.data)
        } catch (err) {
            console.log('fetch modules error:', err)
        }
    }

    const fetchTeachers = async () => {
        try {
            const res = await axios.get(`${API_URL}/teachers`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            })
            setListTeachers(res.data)
        } catch (err) {
            console.log('fetch teachers error:', err)
        }
    }

    const fetchGrades = async () => {
        try {
            const res = await axios.get(`${API_URL}/grades`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            })
            setListGrades(res.data)
        } catch (err) {
            console.log('fetch grades error:', err)
        }
    }

    useEffect(() => {
        fetchModules()
        fetchTeachers()
        fetchGrades()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCoTeachers = (e) => {
        const selected = Array.from(e.target.selectedOptions, opt => parseInt(opt.value))
        setFormData(prev => ({ ...prev, coTeacherIds: selected }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${API_URL}/modules`, formData, {
                headers: { Authorization: `Bearer ${user?.token}` },
            })
            setIsOpen(false)
            setFormData(emptyForm)
            fetchModules()
        } catch (err) {
            console.log('create module error:', err.response?.data || err.message)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this module?')) return
        try {
            await axios.delete(`${API_URL}/modules/${id}`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            })
            fetchModules()
        } catch (err) {
            console.log('delete module error:', err)
        }
    }

    return (
        <div className='w-full min-h-screen bg-bluebg'>

            {isOpen && (
                <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50'>
                    <div className='bg-white p-6 rounded-xl w-[480px] shadow-lg'>
                        <h2 className='text-lg font-bold mb-4'>Create Module</h2>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                            <input type='text' name='Name' placeholder='Module Name'
                                value={formData.Name} onChange={handleChange}
                                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' required />
                            <input type='text' name='Description' placeholder='Description'
                                value={formData.Description} onChange={handleChange}
                                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' />
                            <select name='gradeId' value={formData.gradeId} onChange={handleChange}
                                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' required>
                                <option value=''>Select Grade</option>
                                {listGrades.map((grade) => (
                                    <option key={grade.id} value={grade.id}>
                                        {grade.name}{grade.specialty ? ` — ${grade.specialty}` : ''}
                                    </option>
                                ))}
                            </select>
                            <select name='teacherId' value={formData.teacherId} onChange={handleChange}
                                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' required>
                                <option value=''>Select Main Teacher</option>
                                {listteachers.map(t => (
                                    <option key={t.id} value={t.id}>
                                        {t.User?.firstName} {t.User?.lastName}
                                    </option>
                                ))}
                            </select>
                            <div>
                                <p className='text-xs text-gray mb-1'>Co-Teachers (hold Ctrl to select multiple)</p>
                                <select multiple onChange={handleCoTeachers}
                                    className='border border-gray-200 p-2 rounded-lg text-sm w-full h-28 focus:outline-none focus:ring-2 focus:ring-primary'>
                                    {listteachers.map(t => (
                                        <option key={t.id} value={t.id}>
                                            {t.User?.firstName} {t.User?.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex justify-end gap-3 mt-2'>
                                <button type='button' onClick={() => setIsOpen(false)} className='px-4 py-2 bg-gray-100 rounded-lg text-sm'>Cancel</button>
                                <button type='submit' className='px-4 py-2 bg-primary text-white rounded-lg text-sm'>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className='px-8 py-6'>
                <div className='flex flex-row items-center justify-between mb-6'>
                    <h1 className='text-2xl font-bold text-blue'>Modules Management</h1>
                    <button onClick={() => setIsOpen(true)}
                        className='bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-4 h-4'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                        </svg>
                        Add Module
                    </button>
                </div>

                <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                    <table className='w-full text-sm'>
                        <thead>
                            <tr className='bg-bluebg text-blue text-left'>
                                <th className='px-6 py-3 font-semibold'>Module Name</th>
                                <th className='px-6 py-3 font-semibold'>Grade</th>
                                <th className='px-6 py-3 font-semibold'>Main Teacher</th>
                                <th className='px-6 py-3 font-semibold'>Co-Teachers</th>
                                <th className='px-6 py-3 font-semibold text-right'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listmodules.length > 0 ? (
                                listmodules.map((module) => (
                                    <tr key={module.id} className='border-t border-gray-50 hover:bg-bluebg/40 transition-colors'>
                                        <td className='px-6 py-3 font-medium text-blue'>{module.Name}</td>
                                        <td className='px-6 py-3 text-gray'>{module.Grade?.name || '—'}</td>
                                        <td className='px-6 py-3 text-gray'>
                                            {module.mainTeacher?.User
                                                ? `${module.mainTeacher.User.lastName} ${module.mainTeacher.User.firstName}`
                                                : '—'}
                                        </td>
                                        <td className='px-6 py-3 text-gray'>
                                            {module.Teachers?.length > 0
                                                ? module.Teachers.filter(t => t.User).map(t => `${t.User.lastName} ${t.User.firstName}`).join(', ')
                                                : '—'}
                                        </td>
                                        <td className='px-6 py-3'>
                                            <div className='flex flex-row justify-end gap-2'>
                                                <button onClick={() => handleDelete(module.id)}
                                                    className='p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors'>
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0' />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className='px-6 py-16 text-center text-gray'>No modules found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Gmodule
