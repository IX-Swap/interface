import { getUpdateDSOPayload } from 'app/pages/issuance/utils/utils'
import { getIdFromObj } from 'helpers/strings'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormActionsProps, DSOFormValues } from 'types/dso'
import { useCreateDSO } from './useCreateDSO'
import { useUpdateDSO } from './useUpdateDSO'

export const useSaveDSO = ({ dso, schema }: DSOFormActionsProps) => {
  const dsoId = getIdFromObj(dso)
  const { getValues, setError } = useFormContext<DSOFormValues>()
  const [createDSO, { isLoading: isCreating }] = useCreateDSO()
  const [updateDSO, { isLoading: isUpdating }] = useUpdateDSO(
    dsoId,
    dso?.user ?? ''
  )

  const onSubmit = useCallback(async () => {
    try {
      const values = getValues()
      await schema.validate(values, { abortEarly: false })
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
      const errors = e.inner
      errors.forEach((error: any) => {
        setError(error?.path, { message: error?.message })
      })
    }
  }, [dso, createDSO, getValues, setError, schema, updateDSO])

  return { onSubmit, isLoading: isCreating || isUpdating }
}
