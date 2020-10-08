import React from 'react'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { useCreateDSO } from 'v2/app/pages/issuance/hooks/useCreateDSO'
import { DSOFormValues } from 'v2/types/dso'
import { transformDSOFormValuesToRequestArgs } from 'v2/app/pages/issuance/utils'

export const CreateDSO = () => {
  const [createDSO] = useCreateDSO()
  const handleSubmit = async (values: DSOFormValues) => {
    const args = transformDSOFormValuesToRequestArgs(values)
    await createDSO(args)
  }

  return (
    <DSOForm
      submitButtonLabel='Create DSO'
      onSubmit={handleSubmit}
      isEditing
      isNew
    />
  )
}
