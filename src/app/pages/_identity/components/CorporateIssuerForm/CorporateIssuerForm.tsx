import React, { useEffect } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { useCreateCorporate } from 'app/pages/_identity/hooks/useCreateCorporate'
import { useUpdateCorporate } from 'app/pages/_identity/hooks/useUpdateCorporate'
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { useSubmitCorporate } from 'app/pages/_identity/hooks/useSubmitCorporate'
import { getIdentityDefaultActiveStep } from 'app/pages/_identity/utils/shared'
import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { corporateIssuerFormSteps } from './steps'
import { useParams } from 'react-router'

export const CorporateIssuerForm = () => {
  const { data, isLoading } = useAllCorporates({ type: 'issuer' })
  const params = useParams<{ identityId: string }>()
  const isNew = data === undefined
  const identity = isNew ? undefined : data.map[params.identityId]
  const { isIssuerJourneyCompleted } = useOnboardingJourneys()

  const createMutation = useCreateCorporate('issuer')
  const updateMutation = useUpdateCorporate('issuer')
  const submitMutation = useSubmitCorporate()
  const { showPreIdentityCreateDialog } = useOnboardingDialog()

  useEffect(() => {
    if (!isLoading && data.list.length === 0) {
      showPreIdentityCreateDialog('corporate')
    }
    // eslint-disable-next-line
  }, [isLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const defaultActiveStep = getIdentityDefaultActiveStep({
    isSubmitted: identity?.status === 'Submitted',
    lastStepIndex: corporateIssuerFormSteps.length - 1,
    isJourneyCompleted: isIssuerJourneyCompleted
  })

  return (
    <FormStepper
      data={identity}
      shouldSaveOnMove={!isIssuerJourneyCompleted}
      createMutation={createMutation}
      editMutation={updateMutation}
      submitMutation={submitMutation}
      defaultActiveStep={defaultActiveStep}
      steps={corporateIssuerFormSteps}
    />
  )
}
