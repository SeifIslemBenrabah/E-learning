import axios from 'axios'
import React, { useEffect, useState } from 'react'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const emptyForm = { firstName: '', lastName: '', email: '', studentId: '', promoId: '', password: '' }

const Gstudent = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [liststudents, setListStudents] = useState([])
    const [listpromo, setListPromo] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [editId, setEditId] = useState(null)
    const [formData, setFormData] = useState(emptyForm)

    const fetchStudents = async () => {
        try {
            const res = await axios.get(`${API_URL}/student`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            })
            setListStudents(res.data)
        } catch (err) {
            console.log('fetch students error:', err)
        }
    }

    const fetchPromos = async () => {
        try {
            const res = await axios.get(`${API_URL}/promo`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            })
            setListPromo(res.data)
        } catch (err) {
            console.log('fetch promos error:', err)
        }
    }

    useEffect(() => {
        fetchStudents()
        fetchPromos()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: name === 'promoId' ? Number(value) : value })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            if (editId) {
                await axios.put(`${API_URL}/student/${editId}`, formData, {
                    headers: { Authorization: `Bearer ${user?.token}` },
                })
            } else {
                await axios.post(`${API_URL}/student`, formData, {
                    headers: { Authorization: `Bearer ${user?.token}` },
                })
            }
            setIsOpen(false)
            setEditId(null)
            setFormData(emptyForm)
            fetchStudents()
        } catch (err) {
            console.log('save student error:', err)
        }
    }

    const handleEdit = (student) => {
        setFormData({
            firstName: student.User?.firstName || '',
            lastName: student.User?.lastName || '',
            email: student.User?.email || '',
            studentId: student.studentId || '',
            promoId: student.promoId || '',
            password: '',
        })
        setEditId(student.id)
        setIsOpen(true)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) return
        try {
            await axios.delete(`${API_URL}/student/${id}`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            })
            fetchStudents()
        } catch (err) {
            console.log('delete student error:', err)
        }
    }

    const openAdd = () => {
        setFormData(emptyForm)
        setEditId(null)
        setIsOpen(true)
    }

    return (
        <div className='w-full min-h-screen bg-bluebg'>

            {isOpen && (
                <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50'>
                    <div className='bg-white p-6 rounded-xl w-96 shadow-lg'>
                        <h2 className='text-lg font-bold mb-4'>{editId ? 'Edit Student' : 'Add Student'}</h2>
                        <form onSubmit={handleSave} className='flex flex-col gap-3'>
                            <div className='flex gap-3'>
                                <input type='text' name='firstName' placeholder='First Name'
                                    value={formData.firstName} onChange={handleChange}
                                    className='border border-gray-200 p-2 rounded-lg text-sm w-1/2 focus:outline-none focus:ring-2 focus:ring-primary' required />
                                <input type='text' name='lastName' placeholder='Last Name'
                                    value={formData.lastName} onChange={handleChange}
                                    className='border border-gray-200 p-2 rounded-lg text-sm w-1/2 focus:outline-none focus:ring-2 focus:ring-primary' required />
                            </div>
                            <input type='email' name='email' placeholder='Email'
                                value={formData.email} onChange={handleChange}
                                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' required />
                            <input type='text' name='studentId' placeholder='Student ID'
                                value={formData.studentId} onChange={handleChange}
                                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' />
                            <select name='promoId' value={formData.promoId} onChange={handleChange}
                                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' required>
                                <option value=''>Select Class</option>
                                {listpromo.map((promo) => (
                                    <option key={promo.id} value={promo.id}>
                                        {promo.promoName} — {promo.Grade?.name}{promo.Grade?.specialty ? ` ${promo.Grade.specialty}` : ''}
                                    </option>
                                ))}
                            </select>
                            {!editId && (
                                <input type='password' name='password' placeholder='Password'
                                    value={formData.password} onChange={handleChange}
                                    className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' required />
                            )}
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
                    <h1 className='text-2xl font-bold text-blue'>Students Management</h1>
                    <button onClick={openAdd}
                        className='bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-4 h-4'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                        </svg>
                        Add Student
                    </button>
                </div>

                <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                    <table className='w-full text-sm'>
                        <thead>
                            <tr className='bg-bluebg text-blue text-left'>
                                <th className='px-6 py-3 font-semibold'>Student ID</th>
                                <th className='px-6 py-3 font-semibold'>Name</th>
                                <th className='px-6 py-3 font-semibold'>Email</th>
                                <th className='px-6 py-3 font-semibold'>Class</th>
                                <th className='px-6 py-3 font-semibold text-right'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {liststudents.length > 0 ? (
                                liststudents.map((student) => (
                                    <tr key={student.id} className='border-t border-gray-50 hover:bg-bluebg/40 transition-colors'>
                                        <td className='px-6 py-3 text-gray'>{student.studentId || '—'}</td>
                                        <td className='px-6 py-3 font-medium text-blue'>
                                            {student.User?.lastName} {student.User?.firstName}
                                        </td>
                                        <td className='px-6 py-3 text-gray'>{student.User?.email}</td>
                                        <td className='px-6 py-3 text-gray'>
                                            {student.Promo?.promoName} — {student.Promo?.Grade?.name}{student.Promo?.Grade?.specialty ? ` ${student.Promo.Grade.specialty}` : ''}
                                        </td>
                                        <td className='px-6 py-3'>
                                            <div className='flex flex-row justify-end gap-2'>
                                                <button onClick={() => handleEdit(student)}
                                                    className='p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors'>
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125' />
                                                    </svg>
                                                </button>
                                                <button onClick={() => handleDelete(student.id)}
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
                                    <td colSpan={5} className='px-6 py-16 text-center text-gray'>No students found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Gstudent
