import React from 'react'
import { ConfirmPopup } from '../../utils/ConfirmPopup'

interface ConfirmProps {
  isOpen: boolean
  setOpen: (foo: boolean) => void
  onAccept: () => void
}

export const ConfirmModal = ({ isOpen, setOpen, onAccept }: ConfirmProps) => {
  const onAcceptWithClose = () => {
    onAccept()
    setOpen(false)
  }
  return (
    <ConfirmPopup
      isOpen={isOpen}
      onDecline={() => {
        setOpen(false)
      }}
      onAccept={onAcceptWithClose}
    />
  )
}
