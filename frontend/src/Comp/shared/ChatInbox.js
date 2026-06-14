import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'
import { AuthData } from '../../Auth/AuthContext'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const ChatInbox = ({ contactsUrl }) => {
  const { user } = AuthData()
  const [contacts, setContacts] = useState([])
  const [activeContact, setActiveContact] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [loadingContacts, setLoadingContacts] = useState(true)
  const [unread, setUnread] = useState({})

  const socketRef = useRef(null)
  const activeContactRef = useRef(null)
  const bottomRef = useRef(null)

  // Connect socket once
  useEffect(() => {
    const socket = io(API_URL, {
      query: { userId: user.id },
      transports: ['websocket', 'polling']
    })
    socketRef.current = socket

    socket.on('receive_message', (msg) => {
      if (activeContactRef.current?.id === msg.senderId) {
        setMessages(prev => [...prev, msg])
      } else {
        setUnread(prev => ({ ...prev, [msg.senderId]: (prev[msg.senderId] || 0) + 1 }))
      }
    })

    socket.on('message_sent', (msg) => {
      setMessages(prev => {
        // Replace the optimistic temp message with the confirmed one
        return prev.map(m => m._temp && m.text === msg.text ? msg : m)
      })
    })

    return () => socket.disconnect()
  }, [user.id])

  // Load contacts
  useEffect(() => {
    axios.get(contactsUrl, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(res => setContacts(res.data))
      .catch(() => {})
      .finally(() => setLoadingContacts(false))
  }, [contactsUrl, user.token])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const selectContact = async (contact) => {
    setActiveContact(contact)
    activeContactRef.current = contact
    setUnread(prev => ({ ...prev, [contact.id]: 0 }))
    setMessages([])
    try {
      const res = await axios.get(
        `${API_URL}/messages/conversation/${user.id}/${contact.id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      setMessages(res.data)
    } catch {
      setMessages([])
    }
  }

  const sendMessage = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || !activeContact || !socketRef.current) return
    setInput('')

    // Optimistic update
    const tempMsg = {
      _temp: true,
      id: `temp_${Date.now()}`,
      senderId: parseInt(user.id),
      receiverId: activeContact.id,
      text,
      createdAt: new Date().toISOString()
    }
    setMessages(prev => [...prev, tempMsg])

    socketRef.current.emit('send_message', {
      senderId: parseInt(user.id),
      receiverId: activeContact.id,
      text
    })
  }

  const fmt = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const initials = (contact) =>
    `${contact.firstName?.[0] ?? ''}${contact.lastName?.[0] ?? ''}`.toUpperCase()

  const filtered = contacts.filter(c =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='w-full min-h-screen bg-bluebg'>
      <div className='px-7 py-6'>
        <h1 className='text-2xl font-bold text-blue mb-6'>Inbox</h1>

        <div className='flex gap-4' style={{ height: 'calc(100vh - 160px)' }}>

          {/* Contacts panel */}
          <div className='w-72 bg-white rounded-xl shadow-sm flex flex-col shrink-0 overflow-hidden'>
            <div className='px-4 py-3 border-b border-gray-100'>
              <div className='flex items-center gap-2 bg-bluebg rounded-lg px-3 py-2'>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 text-gray shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z' />
                </svg>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  type='text' placeholder='Search contacts...'
                  className='bg-transparent text-sm outline-none flex-1 placeholder:text-gray' />
              </div>
            </div>

            <div className='flex-1 overflow-y-auto'>
              {loadingContacts && (
                <div className='flex justify-center py-10'>
                  <div className='w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin' />
                </div>
              )}
              {!loadingContacts && filtered.length === 0 && (
                <div className='flex flex-col items-center justify-center py-12 gap-2'>
                  <p className='text-sm text-gray text-center px-4'>
                    No contacts yet. They appear once modules are assigned.
                  </p>
                </div>
              )}
              {filtered.map(contact => (
                <button key={contact.id} onClick={() => selectContact(contact)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors border-l-2 ${
                    activeContact?.id === contact.id
                      ? 'border-primary bg-primary/5'
                      : 'border-transparent hover:bg-bluebg'
                  }`}>
                  <div className='h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
                    <span className='text-primary text-xs font-bold'>{initials(contact)}</span>
                  </div>
                  <div className='flex-1 text-left min-w-0'>
                    <p className='text-sm font-semibold text-blue truncate'>
                      {contact.firstName} {contact.lastName}
                    </p>
                    <p className='text-xs text-gray truncate'>{contact.email}</p>
                  </div>
                  {unread[contact.id] > 0 && (
                    <span className='h-5 w-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0'>
                      {unread[contact.id]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat panel */}
          <div className='flex-1 bg-white rounded-xl shadow-sm flex flex-col overflow-hidden'>
            {!activeContact ? (
              <div className='flex-1 flex flex-col items-center justify-center gap-3'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-14 h-14 text-gray-200'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155' />
                </svg>
                <p className='text-gray font-medium'>Select a contact to start chatting</p>
                <p className='text-xs text-gray'>Messages are delivered in real time</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className='px-5 py-3.5 border-b border-gray-100 flex items-center gap-3 shrink-0'>
                  <div className='h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
                    <span className='text-primary text-xs font-bold'>{initials(activeContact)}</span>
                  </div>
                  <div>
                    <p className='font-semibold text-blue text-sm'>
                      {activeContact.firstName} {activeContact.lastName}
                    </p>
                    <p className='text-xs text-gray'>{activeContact.email}</p>
                  </div>
                  <div className='ml-auto flex items-center gap-1.5'>
                    <span className='w-2 h-2 bg-green-400 rounded-full' />
                    <span className='text-xs text-gray'>Online</span>
                  </div>
                </div>

                {/* Messages */}
                <div className='flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2'>
                  {messages.length === 0 && (
                    <div className='flex-1 flex items-center justify-center'>
                      <p className='text-gray text-sm'>No messages yet — say hello!</p>
                    </div>
                  )}
                  {messages.map((msg, i) => {
                    const mine = parseInt(msg.senderId) === parseInt(user.id)
                    return (
                      <div key={msg.id ?? i} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-sm px-4 py-2.5 rounded-2xl text-sm break-words ${
                          mine
                            ? 'bg-primary text-white rounded-br-none'
                            : 'bg-bluebg text-blue rounded-bl-none'
                        }`}>
                          <p>{msg.text}</p>
                          <p className={`text-[10px] mt-1 ${mine ? 'text-white/60 text-right' : 'text-gray'}`}>
                            {fmt(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <form onSubmit={sendMessage}
                  className='px-4 py-3 border-t border-gray-100 flex items-center gap-3 shrink-0'>
                  <input value={input} onChange={e => setInput(e.target.value)}
                    placeholder='Type a message...'
                    className='flex-1 bg-bluebg rounded-xl px-4 py-2.5 text-sm text-blue placeholder:text-gray outline-none focus:ring-2 focus:ring-primary/30' />
                  <button type='submit' disabled={!input.trim()}
                    className='h-10 w-10 bg-primary rounded-xl flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' className='w-5 h-5'>
                      <path d='M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z' />
                    </svg>
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ChatInbox
