import { useState } from 'react'

export const useUserActionsDialog = () => {
  const [reset2FAOpen, setOpen2FA] = useState(false)
  const [enabledToggleOpen, setEnabledToggleOpen] = useState(false)
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false)

  const open2FADialog = () => {
    setOpen2FA(true)
  }

  const close2FADialog = () => {
    setOpen2FA(false)
  }

  const openEnabledToggle = () => {
    setEnabledToggleOpen(true)
  }

  const closeEnabledToggle = () => {
    setEnabledToggleOpen(false)
  }

  const openResetPassword = () => {
    setResetPasswordOpen(true)
  }

  const closeResetPassword = () => {
    setResetPasswordOpen(false)
  }

  return {
    reset2FAOpen,
    open2FADialog,
    close2FADialog,
    enabledToggleOpen,
    openEnabledToggle,
    closeEnabledToggle,
    openResetPassword,
    closeResetPassword,
    resetPasswordOpen
  }
}
