import { useState, useCallback, useEffect } from 'react'
import User from 'types/user'
import { useSetRoles } from 'app/pages/admin/hooks/useSetRoles'

export const useAdminView = (user: User, refresh: Function) => {
  const [open, setOpen] = useState(false)
  const [roles, setRoles] = useState<any>(user.roles.split(','))
  const [roleType, setRoleType] = useState()
  const [requestUpdateRoles] = useSetRoles({})

  const updateRoles = useCallback(() => {
    if (!open) {
      setRoles(user.roles.split(','))
    }
  }, [open, user])

  useEffect(() => {
    updateRoles()
  }, [updateRoles])

  const handleRoleChange = (value: string[], roleType: any) => {
    setRoleType(roleType)
    setRoles(value)
  }

  const handleChange = (value: string) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = async () => {
    // await requestUpdateRoles({
    //   userId: user._id,
    //   type: roleType,
    //   roles: roles.join(',')

    // })
    const payload: any = {
      userId: user._id,
      type: roleType
    }
    const tempRoleType: string =
      roleType === 'investorRole' ? 'newInvestorRoles' : 'newUserRoles'
    payload[tempRoleType] =
      roleType === 'investorRole' ? roles : roles.join(',')

    const emptyRoleType: string =
      roleType !== 'investorRole' ? 'newInvestorRoles' : 'newUserRoles'
    payload[emptyRoleType] = ''

    await requestUpdateRoles(payload)
    if (typeof refresh === 'function') {
      refresh()
    }
    setOpen(false)
    window.location.reload()
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
