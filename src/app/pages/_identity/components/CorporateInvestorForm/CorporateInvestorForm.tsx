import React, { useEffect } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { useCreateCorporate } from 'app/pages/_identity/hooks/useCreateCorporate'
import { useUpdateCorporate } from 'app/pages/_identity/hooks/useUpdateCorporate'
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { useSubmitCorporate } from 'app/pages/_identity/hooks/useSubmitCorporate'
import { corporateInvestorFormSteps } from './steps'
import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { getIdentityDefaultActiveStep } from 'app/pages/_identity/utils/shared'
import { useParams } from 'react-router'

export const CorporateInvestorForm = () => {
  const { data, isLoading } = useAllCorporates({ type: 'investor' })
  const params = useParams<{ identityId: string }>()
  const isNew = data === undefined
  const identity = isNew ? undefined : data.map[params.identityId]

  const createMutation = useCreateCorporate('investor')
  const updateMutation = useUpdateCorporate('investor')
  const submitMutation = useSubmitCorporate()
  const { showPreIdentityCreateDialog } = useOnboardingDialog()
  const { isInvestorJourneyCompleted } = useOnboardingJourneys()

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
    lastStepIndex: corporateInvestorFormSteps.length - 1,
    isJourneyCompleted: isInvestorJourneyCompleted
  })

  return (
    <FormStepper
      data={identity}
      createMutation={createMutation}
      editMutation={updateMutation}
      submitMutation={submitMutation}
      steps={corporateInvestorFormSteps}
      defaultActiveStep={defaultActiveStep}
      shouldSaveOnMove={!isInvestorJourneyCompleted}
    />
  )
}
