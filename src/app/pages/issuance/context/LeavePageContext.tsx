import { LeavePagePrompt } from 'components/LeavePagePrompt/LeavePagePrompt'
import React, { createContext, useState } from 'react'

export const LeavePageContext = createContext<{
  openPrompt: () => void
  closePrompt: () => void
  showPrompt: boolean
} | null>(null)

export const LeavePageContextWrapper: React.FC = ({ children }) => {
  const [showPrompt, setShowPrompt] = useState(false)

  const openPrompt = () => setShowPrompt(true)
  const closePrompt = () => setShowPrompt(false)

  return (
    <LeavePageContext.Provider value={{ openPrompt, closePrompt, showPrompt }}>
      {children}
      <LeavePagePrompt showPrompt={showPrompt} />
    </LeavePageContext.Provider>
  )
}
