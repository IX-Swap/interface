import { useState } from 'react'
import { useServices } from 'hooks/useServices'

export const useUserActionsDialog = () => {
  const { snackbarService } = useServices()
  const [reset2FAOpen, setOpen2FA] = useState(false)
  const [enabledToggleOpen, setEnabledToggleOpen] = useState(false)
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false)
  const [deleteTenantOpen, setDeleteTenantOpen] = useState(false)

  const open2FADialog = () => {
    setOpen2FA(true)
  }

  const close2FADialog = () => {
    setOpen2FA(false)
  }

  const openDeleteTenant = () => {
    setDeleteTenantOpen(true)
  }

  const closeDeleteTenant = () => {
    setDeleteTenantOpen(false)
  }

  const openEnabledToggle = () => {
    setEnabledToggleOpen(true)
  }

  const closeEnabledToggle = () => {
    setEnabledToggleOpen(false)
  }

  const openResetPassword = (isActive: boolean) => {
    if (isActive) {
      snackbarService.showSnackbar('Account Reset has already started', 'error')
    } else {
      setResetPasswordOpen(true)
    }
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
    resetPasswordOpen,
    deleteTenantOpen,
    openDeleteTenant,
    closeDeleteTenant
  }
}
