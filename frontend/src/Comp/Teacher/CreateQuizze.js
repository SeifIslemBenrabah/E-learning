import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthData } from '../../Auth/AuthContext'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const CreateQuizze = () => {
  const { user } = AuthData()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const courId = searchParams.get('courId')

  const [quizForm, setQuizForm] = useState({ title: '' })
  const [questions, setQuestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [questionForm, setQuestionForm] = useState({
    text: '',
    answers: ['', '', '', ''],
    correct: 0,
  })

  const handleAnswerChange = (index, value) => {
    const updated = [...questionForm.answers]
    updated[index] = value
    setQuestionForm(prev => ({ ...prev, answers: updated }))
  }

  const handleAddQuestion = (e) => {
    e.preventDefault()
    setQuestions(prev => [...prev, { ...questionForm }])
    setQuestionForm({ text: '', answers: ['', '', '', ''], correct: 0 })
    setIsOpen(false)
  }

  const removeQuestion = (idx) => setQuestions(prev => prev.filter((_, i) => i !== idx))

  const handleSubmit = async () => {
    if (!quizForm.title.trim()) return alert('Please enter a quiz title.')
    if (questions.length === 0) return alert('Add at least one question.')
    if (!courId) return alert('No course selected. Go back and click Add Quiz from a course.')

    setSaving(true)
    try {
      // 1. Create the quiz
      const quizRes = await axios.post(`${API_URL}/quiz`, {
        courId: parseInt(courId),
        title: quizForm.title,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      })

      const quizId = quizRes.data.id

      // 2. Add each question with its answers
      await Promise.all(questions.map((q) =>
        axios.post(`${API_URL}/quiz/question`, {
          quizId,
          text: q.text,
          answers: q.answers.map((a, i) => ({ text: a, isCorrect: i === q.correct })),
        }, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
      ))

      navigate('/teacher/Quizze')
    } catch (err) {
      console.log('Submit quiz error:', err)
      alert('Failed to save quiz. Check console for details.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='w-full min-h-screen bg-bluebg'>

      {/* Add question modal */}
      {isOpen && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50'>
          <div className='bg-white p-6 rounded-xl shadow-lg w-[500px]'>
            <h2 className='text-lg font-bold mb-4'>Add Question</h2>
            <form onSubmit={handleAddQuestion} className='flex flex-col gap-3'>
              <input type='text' placeholder='Question text'
                value={questionForm.text}
                onChange={(e) => setQuestionForm(prev => ({ ...prev, text: e.target.value }))}
                className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' required />
              <p className='text-xs font-semibold text-gray'>Answers — select the correct one:</p>
              {questionForm.answers.map((ans, i) => (
                <div key={i} className='flex items-center gap-3'>
                  <input type='radio' name='correct' checked={questionForm.correct === i}
                    onChange={() => setQuestionForm(prev => ({ ...prev, correct: i }))}
                    className='accent-primary' />
                  <input type='text' placeholder={`Answer ${i + 1}`} value={ans}
                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                    className='flex-1 border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary' required />
                </div>
              ))}
              <div className='flex justify-end gap-3 mt-2'>
                <button type='button' onClick={() => setIsOpen(false)} className='px-4 py-2 bg-gray-100 rounded-lg text-sm'>Cancel</button>
                <button type='submit' className='px-4 py-2 bg-primary text-white rounded-lg text-sm'>Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className='px-7 py-6'>
        <div className='flex items-center gap-4 mb-6'>
          <button onClick={() => navigate('/teacher/Quizze')}
            className='text-gray hover:text-blue transition-colors'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' />
            </svg>
          </button>
          <h1 className='text-2xl font-bold text-blue'>Create Quiz</h1>
        </div>

        <div className='bg-white rounded-xl shadow-sm px-6 py-5 flex flex-col gap-4'>
          <input type='text' placeholder='Quiz Title'
            value={quizForm.title}
            onChange={(e) => setQuizForm({ title: e.target.value })}
            className='border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-2/3' />

          <div className='flex items-center justify-between'>
            <p className='font-semibold text-blue'>Questions ({questions.length})</p>
            <button onClick={() => setIsOpen(true)}
              className='bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-4 h-4'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
              </svg>
              Add Question
            </button>
          </div>

          {questions.length > 0 && (
            <ul className='flex flex-col gap-3'>
              {questions.map((q, i) => (
                <li key={i} className='bg-bluebg rounded-xl px-4 py-3 text-sm'>
                  <div className='flex justify-between items-start'>
                    <p className='font-semibold text-blue'>{i + 1}. {q.text}</p>
                    <button onClick={() => removeQuestion(i)} className='text-red-400 hover:text-red-600 ml-3'>✕</button>
                  </div>
                  <ul className='ml-4 mt-2 space-y-1'>
                    {q.answers.map((a, j) => (
                      <li key={j} className={j === q.correct ? 'text-green-600 font-semibold' : 'text-gray'}>
                        {j === q.correct ? '✓ ' : '○ '}{a}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}

          <div className='flex justify-end mt-2'>
            <button onClick={handleSubmit} disabled={saving}
              className='bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50'>
              {saving ? 'Saving...' : 'Save Quiz'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateQuizze
