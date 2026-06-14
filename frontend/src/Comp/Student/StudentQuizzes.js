import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AuthData } from '../../Auth/AuthContext'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const QuizModal = ({ quiz, user, onClose }) => {
  const [selected, setSelected] = useState({})
  const [result, setResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const allAnswered = quiz.Questions?.every(q => selected[q.id] !== undefined)

  const handleSubmit = async () => {
    const answers = Object.entries(selected).map(([questionId, answerId]) => ({
      questionId: parseInt(questionId),
      answerId: parseInt(answerId)
    }))
    setSubmitting(true)
    try {
      const res = await axios.post(`${API_URL}/quiz/submit`, {
        quizId: quiz.id,
        answers,
        userId: user.id
      }, { headers: { Authorization: `Bearer ${user.token}` } })
      setResult(res.data)
    } catch {
      alert('Failed to submit quiz.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='px-6 py-5 border-b border-gray-100 flex items-center justify-between'>
          <h2 className='font-bold text-blue text-lg'>{quiz.title}</h2>
          <button onClick={onClose} className='text-gray hover:text-blue text-xl leading-none'>✕</button>
        </div>

        {result ? (
          <div className='flex flex-col items-center justify-center py-12 gap-4'>
            <div className={`h-24 w-24 rounded-full flex items-center justify-center text-2xl font-bold ${
              result.score / result.total >= 0.5 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
            }`}>
              {result.score}/{result.total}
            </div>
            <p className='font-bold text-blue text-xl'>
              {result.score / result.total >= 0.5 ? 'Well done!' : 'Keep practicing!'}
            </p>
            <p className='text-gray text-sm'>
              Score: {Math.round((result.score / result.total) * 100)}%
            </p>
            <button onClick={onClose}
              className='mt-4 bg-primary text-white px-8 py-2.5 rounded-xl font-medium'>
              Close
            </button>
          </div>
        ) : (
          <div className='px-6 py-4 flex flex-col gap-6'>
            {quiz.Questions?.map((q, i) => (
              <div key={q.id}>
                <p className='font-semibold text-blue text-sm mb-3'>{i + 1}. {q.text}</p>
                <div className='flex flex-col gap-2'>
                  {q.Answers?.map(ans => (
                    <label key={ans.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                        selected[q.id] === ans.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <input type='radio' name={`q-${q.id}`}
                        checked={selected[q.id] === ans.id}
                        onChange={() => setSelected(prev => ({ ...prev, [q.id]: ans.id }))}
                        className='accent-primary shrink-0' />
                      <span className='text-sm text-blue'>{ans.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className='flex justify-end gap-3 pb-2'>
              <button onClick={onClose}
                className='px-4 py-2 bg-gray-100 rounded-xl text-sm text-blue'>
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={!allAnswered || submitting}
                className='px-6 py-2 bg-primary text-white rounded-xl text-sm font-medium disabled:opacity-50'>
                {submitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const StudentQuizzes = () => {
  const { user } = AuthData()
  const [modules, setModules] = useState([])
  const [quizMap, setQuizMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeQuiz, setActiveQuiz] = useState(null)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const studentRes = await axios.get(`${API_URL}/student/user/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        })
        const student = studentRes.data
        if (!student?.Promo?.Grade?.id) {
          setError('Student profile incomplete — contact your admin.')
          return
        }

        const modsRes = await axios.get(`${API_URL}/modules/grade/${student.Promo.Grade.id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        })
        const mods = modsRes.data
        setModules(mods)

        const map = {}
        for (const mod of mods) {
          for (const cour of mod.Cours || []) {
            const qRes = await axios.get(`${API_URL}/quiz/course/${cour.id}`, {
              headers: { Authorization: `Bearer ${user.token}` }
            })
            if (qRes.data.length > 0) {
              map[cour.id] = { cour, quizzes: qRes.data }
            }
          }
        }
        setQuizMap(map)
      } catch {
        setError('Failed to load quizzes.')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [user.id, user.token])

  const totalQuizzes = Object.values(quizMap).reduce((sum, v) => sum + v.quizzes.length, 0)

  return (
    <div className='w-full min-h-screen bg-bluebg'>
      {activeQuiz && (
        <QuizModal quiz={activeQuiz} user={user} onClose={() => setActiveQuiz(null)} />
      )}
      <div className='px-8 py-6'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-blue'>My Quizzes</h1>
          <p className='text-sm text-gray mt-1'>
            {totalQuizzes} quiz{totalQuizzes !== 1 ? 'zes' : ''} available across your modules.
          </p>
        </div>

        {loading && (
          <div className='flex justify-center items-center py-20'>
            <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
          </div>
        )}

        {error && (
          <div className='bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm'>{error}</div>
        )}

        {!loading && !error && totalQuizzes === 0 && (
          <div className='bg-white rounded-xl shadow-sm flex flex-col items-center justify-center py-20 gap-3'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-12 h-12 text-gray-300'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z' />
            </svg>
            <p className='text-gray font-medium'>No quizzes yet</p>
            <p className='text-xs text-gray'>Your teachers haven't created any quizzes yet.</p>
          </div>
        )}

        {!loading && !error && totalQuizzes > 0 && (
          <div className='flex flex-col gap-5'>
            {modules.map(mod => {
              const coursesWithQuizzes = (mod.Cours || []).filter(c => quizMap[c.id])
              if (coursesWithQuizzes.length === 0) return null
              return (
                <div key={mod.id} className='bg-white rounded-xl shadow-sm overflow-hidden'>
                  <div className='px-5 py-4 border-b border-gray-100'>
                    <p className='font-semibold text-blue'>{mod.Name}</p>
                    {mod.Grade && <p className='text-xs text-gray mt-0.5'>{mod.Grade.name}</p>}
                  </div>
                  <div className='px-5 py-4 flex flex-col gap-4'>
                    {coursesWithQuizzes.map(cour => (
                      <div key={cour.id}>
                        <p className='text-xs font-semibold text-gray uppercase tracking-wide mb-2'>{cour.Name}</p>
                        <div className='flex flex-col gap-2'>
                          {quizMap[cour.id].quizzes.map(quiz => (
                            <div key={quiz.id}
                              className='flex items-center justify-between bg-bluebg rounded-xl px-4 py-3'>
                              <div>
                                <p className='font-semibold text-blue text-sm'>{quiz.title}</p>
                                <p className='text-xs text-gray mt-0.5'>
                                  {quiz.Questions?.length || 0} question{quiz.Questions?.length !== 1 ? 's' : ''}
                                </p>
                              </div>
                              <button onClick={() => setActiveQuiz(quiz)}
                                className='bg-primary text-white text-xs font-medium px-4 py-2 rounded-xl hover:opacity-90 transition-opacity'>
                                Take Quiz
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentQuizzes
