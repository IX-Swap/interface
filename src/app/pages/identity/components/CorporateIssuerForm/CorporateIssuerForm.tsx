import React from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useCreateCorporate } from 'app/pages/identity/hooks/useCreateCorporate'
import { useUpdateCorporate } from 'app/pages/identity/hooks/useUpdateCorporate'
import { useSubmitCorporate } from 'app/pages/identity/hooks/useSubmitCorporate'
import { getIdentityDefaultActiveStep } from 'app/pages/identity/utils/shared'
import { useOnboardingJourneys } from 'app/hooks/onboarding/useOnboardingJourneys'
import { corporateIssuerFormSteps } from './steps'
import { CorporateIdentity } from '../../types/forms'
import { IdentitySubmitConfirmationDialog } from 'app/pages/identity/components/IdentitySubmitConfirmationDialog/IdentitySubmitConfirmationDialog'
import { useConfirmSubmitDialog } from 'app/pages/identity/hooks/useConfirmSubmitDialog'

export interface CorporateIssuerFormProps {
  data?: CorporateIdentity
}

export const CorporateIssuerForm = ({ data }: CorporateIssuerFormProps) => {
  const { open, openDialog, closeDialog } = useConfirmSubmitDialog()

  const { isCorporateJourneyCompleted, corporateIdentities } =
    useOnboardingJourneys()

  const createMutation = useCreateCorporate('issuer')
  const updateMutation = useUpdateCorporate('issuer')
  const submitMutation = useSubmitCorporate(openDialog)

  const isIssuer = corporateIdentities[0]?.type === 'issuer'
  const defaultActiveStep = getIdentityDefaultActiveStep({
    isSubmitted: data?.status === 'Submitted',
    lastStepIndex: corporateIssuerFormSteps.length - 1,
    isJourneyCompleted: isCorporateJourneyCompleted && isIssuer
  })

  return (
    <>
      <IdentitySubmitConfirmationDialog open={open} closeDialog={closeDialog} />
      <FormStepper
        data={data}
        shouldSaveOnMove={!isCorporateJourneyCompleted}
        createMutation={createMutation}
        editMutation={updateMutation}
        submitMutation={submitMutation}
        defaultActiveStep={defaultActiveStep}
        steps={corporateIssuerFormSteps}
        nonLinear
      />
    </>
  )
}
