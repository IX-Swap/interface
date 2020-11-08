import { useServices } from 'v2/hooks/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { getIdFromObj } from 'v2/helpers/strings'
import { useState } from 'react'
import { SelectedDocument } from 'v2/app/pages/accounts/pages/banks/components/BankDocuments'
import { useSelectionHelperContext } from 'v2/components/SelectionHelper'
import { useFormContext } from 'react-hook-form'
import { DataroomFile, FormArray } from 'v2/types/dataroomFile'
import { isSuperUser } from 'v2/helpers/acl'

export const useDeleteFilesArray = (name: string) => {
  const { selected, resetSelection } = useSelectionHelperContext<
    SelectedDocument
  >()
  const { reset, getValues } = useFormContext()
  const { snackbarService, apiService } = useServices()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const deleteMultiple = () => {
    setIsLoading(true)

    const pending = selected.map(async ({ id }) => {
      const userId = getIdFromObj(user)
      const uri = isSuperUser(user?.roles)
        ? `/dataroom/${id}`
        : `/dataroom/${userId}/${id}`

      return await apiService.delete<DataroomFile>(uri, {})
    })

    Promise.all(pending)
      .then(results => {
        const values = getValues()
        const documents = values[name] as FormArray<DataroomFile>
        const successfullyDeletedIds = results
          .filter(d => d.status === 200)
          .map(d => d.data._id)
        const next = documents.filter(
          d => !successfullyDeletedIds.includes(d.value._id)
        )

        reset({ ...(values ?? {}), [name]: next })

        snackbarService.showSnackbar(
          `Successfully deleted ${successfullyDeletedIds.length} files`,
          'success'
        )
      })
      .catch(error => {
        snackbarService.showSnackbar(error.message, 'error')
      })
      .finally(() => {
        resetSelection()
        setIsLoading(false)
      })
  }

  return {
    deleteMultiple,
    isLoading
  }
}
