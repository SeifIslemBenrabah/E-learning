import React from 'react'
import ChatInbox from '../shared/ChatInbox'
import { AuthData } from '../../Auth/AuthContext'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const StudentInbox = () => {
  const { user } = AuthData()
  return <ChatInbox contactsUrl={`${API_URL}/messages/contacts/student/${user.id}`} />
}

export default StudentInbox
