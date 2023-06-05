import { useState, useCallback, useEffect } from 'react'
import User from 'types/user'
import { useSetRoles } from 'app/pages/admin/hooks/useSetRoles'

export const useAdminView = (user: User, refresh: Function) => {
  console.log(user, refresh, 'jjjj')
  const [open, setOpen] = useState(false)
  const [roles, setRoles] = useState<string[]>(user.roles.split(','))
  const [requestUpdateRoles] = useSetRoles({})

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

    if (typeof refresh === 'function') {
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
