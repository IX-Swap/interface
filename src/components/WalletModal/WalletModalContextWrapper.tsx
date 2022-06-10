import React, { createContext, useState } from 'react'
import WalletModal from './WalletModal'

export const WalletModalContext = createContext<{
  toggleModal: () => void
  isOpen: boolean
} | null>(null)

export const WalletModalContextWrapper: React.FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false)
  const toggleModal = () => setOpen(!isOpen)

  return (
    <WalletModalContext.Provider value={{ toggleModal, isOpen }}>
      {children}
      <WalletModal isOpen={isOpen} toggleModal={toggleModal} />
    </WalletModalContext.Provider>
  )
}
