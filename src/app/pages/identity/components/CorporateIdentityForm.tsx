import React from 'react'
import { CorporateIdentity } from 'types/identity'
import { CorporateIdentityFormValues } from 'app/pages/identity/components/types'
import { useCreateCorporateIdentity } from 'hooks/identity/useCreateCorporateIdentity'
import { useUpdateCorporateIdentity } from 'hooks/identity/useUpdateCorporateIdentity'
import { FormStepper } from 'app/components/FormStepper/FormStepper'

export interface CorporateIdentityFormProps {
  data: CorporateIdentity | undefined
  onSubmit?: (values: CorporateIdentityFormValues) => void
  submitButtonText?: string
  cancelButton?: JSX.Element
}

export const CorporateIdentityForm = (
  props: CorporateIdentityFormProps
): JSX.Element => {
  const { data } = props

  const createMutation = useCreateCorporateIdentity()
  const updateMutation = useUpdateCorporateIdentity(data?._id as string)
  const submitMutation = useUpdateCorporateIdentity(data?._id as string)

  return (
    <FormStepper
      data={data}
      createMutation={createMutation}
      editMutation={updateMutation}
      submitMutation={submitMutation}
      steps={[]}
    />
  )
}
