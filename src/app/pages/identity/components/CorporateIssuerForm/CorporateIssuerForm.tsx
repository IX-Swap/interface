import React, { useEffect } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useCreateCorporate } from 'app/pages/identity/hooks/useCreateCorporate'
import { useUpdateCorporate } from 'app/pages/identity/hooks/useUpdateCorporate'
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { useSubmitCorporate } from 'app/pages/identity/hooks/useSubmitCorporate'
import { getIdentityDefaultActiveStep } from 'app/pages/identity/utils/shared'
import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { corporateIssuerFormSteps } from './steps'
import { CorporateIdentity } from '../../types/forms'

export interface CorporateIssuerFormProps {
  data?: CorporateIdentity
}

export const CorporateIssuerForm = ({ data }: CorporateIssuerFormProps) => {
  const { isIssuerJourneyCompleted } = useOnboardingJourneys()

  const createMutation = useCreateCorporate('issuer')
  const updateMutation = useUpdateCorporate('issuer')
  const submitMutation = useSubmitCorporate()
  const { showPreIdentityCreateDialog } = useOnboardingDialog()

  useEffect(() => {
    if (data === undefined) {
      showPreIdentityCreateDialog('corporate')
    }
  }, [data]) //eslint-disable-line

  const defaultActiveStep = getIdentityDefaultActiveStep({
    isSubmitted: data?.status === 'Submitted',
    lastStepIndex: corporateIssuerFormSteps.length - 1,
    isJourneyCompleted: isIssuerJourneyCompleted
  })

  return (
    <FormStepper
      data={data}
      shouldSaveOnMove={!isIssuerJourneyCompleted}
      createMutation={createMutation}
      editMutation={updateMutation}
      submitMutation={submitMutation}
      defaultActiveStep={defaultActiveStep}
      steps={corporateIssuerFormSteps}
      nonLinear
    />
  )
}
