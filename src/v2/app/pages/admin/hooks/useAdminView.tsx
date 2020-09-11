import { useState, useCallback, useEffect } from 'react'
import User from 'v2/types/user'
import { useSetRoles } from 'v2/app/pages/admin/hooks/useSetRoles'

export const useAdminView = (user: User, refresh: Function) => {
  const [open, setOpen] = useState(false)
  const [roles, setRoles] = useState<string[]>(user.roles.split(','))
  const [requestUpdateRoles] = useSetRoles()

  const updateRoles = useCallback(() => {
    if (!open) {
      setRoles(user.roles.split(','))
    }
  }, [open, user])

  useEffect(() => {
    updateRoles()
  }, [updateRoles])

  const handleRoleChange = (value: string[]) => {
    setRoles(value)
  }

  const handleChange = (value: string) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = async () => {
    await requestUpdateRoles({ userId: user._id, roles: roles.join(',') })

    if (refresh !== undefined) {
      refresh()
    }

    setOpen(false)
  }

  return {
    open,
    setOpen,
    roles,
    setRoles,
    handleRoleChange,
    handleChange,
    handleClose,
    handleConfirm
  }
}
