import { useState } from 'react'
import xor from 'lodash/xor'
import { useSetRoles } from 'app/pages/admin/hooks/useSetRoles'
import { useServices } from 'hooks/useServices'
import { useQueryCache } from 'react-query'
import { usersQueryKeys } from 'config/queryKeys'
import { useParams } from 'react-router-dom'

export const useRoleManagement = (initialRoles: string[]) => {
  const { snackbarService } = useServices()
  const [selectedRoles, setSelectedRoles] = useState(initialRoles)
  const params = useParams<{ userId: string }>()
  const queryCache = useQueryCache()

  const onSuccess = async () => {
    snackbarService.showSnackbar(
      'User roles update has been successful',
      'success'
    )
    await queryCache.invalidateQueries(
      usersQueryKeys.getUserById(params.userId)
    )
  }

  const onError = (error: any) => [
    snackbarService.showSnackbar(error.message, 'error')
  ]

  const [requestUpdateRoles] = useSetRoles({ onSuccess, onError })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRoles(xor(selectedRoles, [event.target.name]))
  }

  const handleUpdate = async () => {
    await requestUpdateRoles({
      userId: params.userId,
      roles: selectedRoles.join(',')
    })
  }

  return {
    selectedRoles,
    handleChange,
    handleUpdate
  }
}
