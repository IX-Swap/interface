// import { getUpdateDSOPayload } from 'app/pages/issuance/utils/utils'
import { getIdFromObj } from 'helpers/strings'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { TenantFormActionsProps, TenantFormValues } from 'types/tenants'
import { useCreateTenant } from './useCreateTenant'
import { useUpdateTenant } from './useUpdateTenant'

export const useSaveTenant = ({ tenant, schema }: TenantFormActionsProps) => {
  const tenantId = getIdFromObj(tenant)
  const { getValues, setError } = useFormContext<TenantFormValues>()
  const [createTenant, { isLoading: isCreating }] = useCreateTenant()
  const [updateTenant, { isLoading: isUpdating }] = useUpdateTenant(tenantId)

  const onSubmit = useCallback(async () => {
    try {
      const values = getValues()
      console.log(values)
      await schema.validate(values, { abortEarly: false })

      if (tenant === undefined) {
        await createTenant(values)
      } else {
        delete values.tenantCode
        await updateTenant(values)
      }
    } catch (e: any) {
      const errors = e.inner
      errors.forEach((error: any) => {
        setError(error?.path, { message: error?.message })
        console.log(errors)
      })
    }
  }, [tenant, createTenant, getValues, setError, schema, updateTenant])

  return { onSubmit, isLoading: isCreating || isUpdating }
}
