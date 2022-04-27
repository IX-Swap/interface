import { getIdFromObj } from 'helpers/strings'
import { useServices } from 'hooks/useServices'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormActionsProps, DSOFormValues } from 'types/dso'
import { getUpdateDSOPayload } from 'app/pages/issuance/utils/utils'
import { useCreateDSO } from './useCreateDSO'
import { useUpdateDSO } from './useUpdateDSO'

export const useSaveDSO = ({ dso, schema }: DSOFormActionsProps) => {
  const { snackbarService } = useServices()
  const dsoId = getIdFromObj(dso)
  const { getValues } = useFormContext<DSOFormValues>()
  const [createDSO, { isLoading: isCreating }] = useCreateDSO()
  const [updateDSO, { isLoading: isUpdating }] = useUpdateDSO(
    dsoId,
    dso?.user ?? ''
  )

  const onSubmit = useCallback(async () => {
    try {
      const values = getValues()
      await schema.validate(values)
      const formValues = getUpdateDSOPayload({
        ...values,
        status: 'Draft'
      })
      if (dso === undefined) {
        await createDSO(formValues)
      } else {
        await updateDSO(formValues)
      }
    } catch (e: any) {
      void snackbarService.showSnackbar(e.message, 'error')
    }
  }, [dso, createDSO, getValues, schema, updateDSO, snackbarService])

  return { onSubmit, isLoading: isCreating || isUpdating }
}
