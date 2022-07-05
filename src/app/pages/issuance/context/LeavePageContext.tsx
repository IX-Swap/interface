import { LeavePagePrompt } from 'components/LeavePagePrompt/LeavePagePrompt'
import React, { createContext, useState } from 'react'

export const LeavePageContext = createContext<{
  openPrompt: () => void
  closePrompt: () => void
  showPrompt: boolean
} | null>(null)

export const LeavePageContextWrapper: React.FC = ({ children }) => {
  const [promptCounter, setPromptCounter] = useState(0)
  const openPrompt = () => setPromptCounter(count => count + 1)
  const closePrompt = () => setPromptCounter(count => count - 1)

  return (
    <LeavePageContext.Provider
      value={{ openPrompt, closePrompt, showPrompt: promptCounter > 0 }}
    >
      {children}
      <LeavePagePrompt showPrompt={promptCounter > 0} />
    </LeavePageContext.Provider>
  )
}
