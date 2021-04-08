import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { detailsOfIssuanceFormSteps } from 'app/pages/_identity/components/DetailsOfIssuanceForm/steps'
import { useCreateDetailsOfIssuance } from 'app/pages/_identity/hooks/useCreateDetailsOfIssuance'
import { useDetailsOfIssuance } from 'app/pages/_identity/hooks/useDetailsOfIssuance'
import { useUpdateDetailsOfIssuance } from 'app/pages/_identity/hooks/useUpdateDetailsOfIssuance'
import React, { memo } from 'react'
import { getIdentityDefaultActiveStep } from 'app/pages/_identity/utils/shared'
import { useSubmitDetailsOfIssuance } from 'app/pages/_identity/hooks/useSubmitDetailsOfIssuance'

export const DetailsOfIssuanceForm = memo(() => {
  const { data, isLoading } = useDetailsOfIssuance()
  const createMutation = useCreateDetailsOfIssuance()
  const updateMutation = useUpdateDetailsOfIssuance(data?._id ?? '')
  const submitMutation = useSubmitDetailsOfIssuance(data?._id ?? '')

  if (isLoading) {
    return <div>Loading...</div>
  }

  const defaultActiveStep = getIdentityDefaultActiveStep({
    isSubmitted: data?.status === 'Submitted',
    lastStepIndex: detailsOfIssuanceFormSteps.length - 1,
    isJourneyCompleted: false
  })

  return (
    <FormStepper
      data={data}
      shouldSaveOnMove={true}
      createMutation={createMutation}
      editMutation={updateMutation}
      submitMutation={submitMutation}
      defaultActiveStep={defaultActiveStep}
      steps={detailsOfIssuanceFormSteps}
    />
  )
})
