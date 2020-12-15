import React from 'react'
import { DSOForm } from 'app/components/DSO/DSOForm'
import { useCreateDSO } from 'app/pages/issuance/hooks/useCreateDSO'
import { DSOFormValues } from 'types/dso'
import { transformDSOFormValuesToRequestArgs } from 'app/pages/issuance/utils'

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
