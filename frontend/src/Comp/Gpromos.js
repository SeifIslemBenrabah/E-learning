import axios from 'axios'
import React, { useEffect, useState } from 'react'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const Gpromos = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [listpromo, setlistpromo] = useState([])
    const [listGrades, setlistGrades] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [currentId, setCurrentId] = useState(null)
    const [formData, setFormData] = useState({ promoName: '', gradeId: '' })

    const fetchPromos = async () => {
        try {
            const res = await axios.get(`${API_URL}/promo`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            })
            setlistpromo(res.data)
        } catch (err) {
            console.log('fetch promos error:', err)
        }
    }

    const fetchGrades = async () => {
        try {
            const res = await axios.get(`${API_URL}/grades`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            })
            setlistGrades(res.data)
        } catch (err) {
            console.log('fetch grades error:', err)
        }
    }

    useEffect(() => {
        fetchPromos()
        fetchGrades()
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleAddPromo = async (e) => {
        e.preventDefault()
        try {
            const payload = { ...formData, gradeId: parseInt(formData.gradeId) }
            if (isEdit) {
                await axios.put(`${API_URL}/promo/${currentId}`, payload, {
                    headers: { Authorization: `Bearer ${user?.token}` },
                })
            } else {
                await axios.post(`${API_URL}/promo`, payload, {
                    headers: { Authorization: `Bearer ${user?.token}` },
                })
            }
            setIsOpen(false)
            setIsEdit(false)
            setFormData({ promoName: '', gradeId: '' })
            setCurrentId(null)
            fetchPromos()
        } catch (err) {
            console.log('save promo error:', err)
        }
    }

    const handleDeletePromo = async (id) => {
        if (!window.confirm('Are you sure you want to delete this class?')) return
        try {
            await axios.delete(`${API_URL}/promo/${id}`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            })
            fetchPromos()
        } catch (err) {
            console.log('delete promo error:', err)
        }
    }

    const handleEditPromo = (promo) => {
        setIsOpen(true)
        setIsEdit(true)
        setCurrentId(promo.id)
        setFormData({ promoName: promo.promoName, gradeId: promo.gradeId })
    }

    return (
        <div className='w-full min-h-screen bg-bluebg'>

            {/* Modal */}
            {isOpen && (
                <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50'>
                    <div className='bg-white p-6 rounded-xl w-96 shadow-lg'>
                        <h2 className='text-lg font-bold mb-4'>{isEdit ? 'Edit Class' : 'Add Class'}</h2>
                        <form onSubmit={handleAddPromo} className='flex flex-col gap-3'>
                            <input
                                type='text'
                                name='promoName'
                                placeholder='Class Name'
                                value={formData.promoName}
                                onChange={handleChange}
                                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary'
                                required
                            />
                            <select
                                name='gradeId'
                                value={formData.gradeId}
                                onChange={handleChange}
                                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary'
                                required
                            >
                                <option value=''>Select Grade</option>
                                {listGrades.map((grade) => (
                                    <option key={grade.id} value={grade.id}>
                                        {grade.name}{grade.specialty ? ` - ${grade.specialty}` : ''}
                                    </option>
                                ))}
                            </select>
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
                    <h1 className='text-2xl font-bold text-blue'>Class Management</h1>
                    <button
                        onClick={() => { setIsEdit(false); setFormData({ promoName: '', gradeId: '' }); setIsOpen(true) }}
                        className='bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors'
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-4 h-4'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                        </svg>
                        Add Class
                    </button>
                </div>

                <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                    <table className='w-full text-sm'>
                        <thead>
                            <tr className='bg-bluebg text-blue text-left'>
                                <th className='px-6 py-3 font-semibold'>Class Name</th>
                                <th className='px-6 py-3 font-semibold'>Grade</th>
                                <th className='px-6 py-3 font-semibold'>Specialty</th>
                                <th className='px-6 py-3 font-semibold'>Students</th>
                                <th className='px-6 py-3 font-semibold text-right'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listpromo.length > 0 ? (
                                listpromo.map((promo) => (
                                    <tr key={promo.id} className='border-t border-gray-50 hover:bg-bluebg/40 transition-colors'>
                                        <td className='px-6 py-3 font-medium text-blue'>{promo.promoName}</td>
                                        <td className='px-6 py-3 text-gray'>{promo.Grade?.name}</td>
                                        <td className='px-6 py-3 text-gray'>{promo.Grade?.specialty || '—'}</td>
                                        <td className='px-6 py-3 text-gray'>{promo.studentCount ?? '—'}</td>
                                        <td className='px-6 py-3'>
                                            <div className='flex flex-row justify-end gap-2'>
                                                <button
                                                    onClick={() => handleEditPromo(promo)}
                                                    className='p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors'
                                                >
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125' />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePromo(promo.id)}
                                                    className='p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors'
                                                >
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
                                    <td colSpan={5} className='px-6 py-16 text-center text-gray'>No classes found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Gpromos
