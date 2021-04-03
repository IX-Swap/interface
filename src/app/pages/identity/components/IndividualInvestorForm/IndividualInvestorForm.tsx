import React, { useEffect, memo } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { useCreateIndividual } from 'app/pages/identity/hooks/useCreateIndividual'
import { useSubmitIndividual } from '../../hooks/useSubmitIndividual'
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { individualInvestorFormSteps } from './steps'
import { getIdentityDefaultActiveStep } from 'app/pages/identity/utils/shared'

export const IndividualInvestorForm = memo(() => {
  const { data, isLoading } = useIndividualIdentity()
  const mutation = useCreateIndividual()
  const submitMutation = useSubmitIndividual()
  const { showPreIdentityCreateDialog } = useOnboardingDialog()
  const { isIndividualJourneyCompleted } = useOnboardingJourneys()

  useEffect(() => {
    if (!isLoading && data === undefined) {
      showPreIdentityCreateDialog('individual')
    }
    // eslint-disable-next-line
  }, [isLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const defaultActiveStep = getIdentityDefaultActiveStep({
    isSubmitted: data?.status === 'Submitted',
    lastStepIndex: individualInvestorFormSteps.length - 1,
    isJourneyCompleted: isIndividualJourneyCompleted
  })

  return (
    <FormStepper
      data={data}
      shouldSaveOnMove={!isIndividualJourneyCompleted}
      createMutation={mutation}
      editMutation={mutation}
      submitMutation={submitMutation}
      defaultActiveStep={defaultActiveStep}
      steps={individualInvestorFormSteps}
    />
  )
})
