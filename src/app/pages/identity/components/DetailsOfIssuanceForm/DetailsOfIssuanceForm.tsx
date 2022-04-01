import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { detailsOfIssuanceFormSteps } from 'app/pages/identity/components/DetailsOfIssuanceForm/steps'
import { useCreateDetailsOfIssuance } from 'app/pages/identity/hooks/useCreateDetailsOfIssuance'
import { useDetailsOfIssuance } from 'app/pages/identity/hooks/useDetailsOfIssuance'
import { useUpdateDetailsOfIssuance } from 'app/pages/identity/hooks/useUpdateDetailsOfIssuance'
import React, { memo, useEffect } from 'react'
import { getIdentityDefaultActiveStep } from 'app/pages/identity/utils/shared'
import { useSubmitDetailsOfIssuance } from 'app/pages/identity/hooks/useSubmitDetailsOfIssuance'
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { Redirect } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'

export const DetailsOfIssuanceForm = memo(() => {
  const { data, isLoading } = useDetailsOfIssuance()
  const createMutation = useCreateDetailsOfIssuance()
  const updateMutation = useUpdateDetailsOfIssuance(data?._id ?? '')
  const submitMutation = useSubmitDetailsOfIssuance(data?._id ?? '')
  const { showCreateDetailsOfIssuanceDialog } = useOnboardingDialog()

  useEffect(() => {
    if (!isLoading && data === undefined) {
      showCreateDetailsOfIssuanceDialog()
    }
    // eslint-disable-next-line
  }, [isLoading])

  if (data?.skipped === true) {
    return <Redirect to={IdentityRoute.createIssuer} />
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
      nonLinear
      skippable
    />
  )
})
