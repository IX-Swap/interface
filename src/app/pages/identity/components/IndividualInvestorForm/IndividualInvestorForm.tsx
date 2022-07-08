import React, { useEffect, memo } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { useCreateIndividual } from 'app/pages/identity/hooks/useCreateIndividual'
import { useSubmitIndividual } from '../../hooks/useSubmitIndividual'
import { useOnboardingJourneys } from 'app/hooks/onboarding/useOnboardingJourneys'
import { individualInvestorFormSteps } from './steps'
import { getIdentityDefaultActiveStep } from 'app/pages/identity/utils/shared'
import { generatePath, useHistory } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { IdentitySubmitConfirmationDialog } from 'app/pages/identity/components/IdentitySubmitConfirmationDialog/IdentitySubmitConfirmationDialog'
import { useConfirmSubmitDialog } from 'app/pages/identity/hooks/useConfirmSubmitDialog'

export const IndividualInvestorForm = memo(() => {
  const { open, closeDialog, openDialog } = useConfirmSubmitDialog()

  const { data, isLoading } = useIndividualIdentity()
  const mutation = useCreateIndividual()
  const submitMutation = useSubmitIndividual(openDialog)
  const { isIndividualJourneyCompleted } = useOnboardingJourneys()
  const { location, replace } = useHistory()

  useEffect(() => {
    if (!isLoading) {
      if (
        data !== undefined &&
        location.pathname === IdentityRoute.createIndividual
      ) {
        replace(
          generatePath(IdentityRoute.editIndividual, {
            identityId: data._id,
            userId: data.user._id
          })
        )
      }
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
    <>
      <IdentitySubmitConfirmationDialog open={open} closeDialog={closeDialog} />
      <FormStepper
        data={data}
        shouldSaveOnMove={!isIndividualJourneyCompleted}
        createMutation={mutation}
        editMutation={mutation}
        submitMutation={submitMutation}
        defaultActiveStep={defaultActiveStep}
        steps={individualInvestorFormSteps}
        nonLinear
        formTitle='Individual Investor Identity'
      />
    </>
  )
})
