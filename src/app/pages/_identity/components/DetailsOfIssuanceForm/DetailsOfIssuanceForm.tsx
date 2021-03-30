import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { detailsOfIssuanceFormSteps } from 'app/pages/_identity/components/DetailsOfIssuanceForm/steps'
import { useCreateDetailsOfIssuance } from 'app/pages/_identity/hooks/useCreateDetailsOfIssuance'
import { useDetailsOfIssuance } from 'app/pages/_identity/hooks/useDetailsOfIssuance'
import { useUpdateDetailsOfIssuance } from 'app/pages/_identity/hooks/useUpdateDetailsOfIssuance'
import React, { memo } from 'react'

export const DetailsOfIssuanceForm = memo(() => {
  const { data, isLoading } = useDetailsOfIssuance()
  const createMutation = useCreateDetailsOfIssuance()
  const updateMutation = useUpdateDetailsOfIssuance()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <FormStepper
      data={data}
      shouldSaveOnMove={true}
      createMutation={createMutation}
      editMutation={updateMutation}
      submitMutation={updateMutation}
      defaultActiveStep={0}
      steps={detailsOfIssuanceFormSteps}
    />
  )
})
