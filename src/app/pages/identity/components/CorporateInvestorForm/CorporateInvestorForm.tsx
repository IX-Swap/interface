import React, { useEffect } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useCreateCorporate } from 'app/pages/identity/hooks/useCreateCorporate'
import { useUpdateCorporate } from 'app/pages/identity/hooks/useUpdateCorporate'
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { useSubmitCorporate } from 'app/pages/identity/hooks/useSubmitCorporate'
import { corporateInvestorFormSteps } from './steps'
import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { getIdentityDefaultActiveStep } from 'app/pages/identity/utils/shared'
import { generatePath, useHistory } from 'react-router'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { CorporateIdentity } from '../../types/forms'

export interface CorporateInvestorFormProps {
  data?: CorporateIdentity
}

export const CorporateInvestorForm = ({ data }: CorporateInvestorFormProps) => {
  const createMutation = useCreateCorporate('investor')
  const updateMutation = useUpdateCorporate('investor')
  const submitMutation = useSubmitCorporate()
  const { showPreIdentityCreateDialog } = useOnboardingDialog()
  const {
    isInvestorJourneyCompleted,
    investorIdentities
  } = useOnboardingJourneys()
  const { location, replace } = useHistory()

  useEffect(() => {
    if (data === undefined) {
      showPreIdentityCreateDialog('corporate')
    }
  }, [data]) // eslint-disable-line

  useEffect(() => {
    if (
      investorIdentities.length > 0 &&
      location.pathname === IdentityRoute.createCorporate
    ) {
      const {
        _id: identityId,
        user: { _id: userId }
      } = investorIdentities[0]

      replace(
        generatePath(IdentityRoute.editCorporate, {
          identityId,
          userId
        })
      )
    }
  }, [location, replace, investorIdentities])

  const defaultActiveStep = getIdentityDefaultActiveStep({
    isSubmitted: data?.status === 'Submitted',
    lastStepIndex: corporateInvestorFormSteps.length - 1,
    isJourneyCompleted: isInvestorJourneyCompleted
  })

  return (
    <FormStepper
      data={data}
      createMutation={createMutation}
      editMutation={updateMutation}
      submitMutation={submitMutation}
      steps={corporateInvestorFormSteps}
      defaultActiveStep={defaultActiveStep}
      shouldSaveOnMove={!isInvestorJourneyCompleted}
      nonLinear
    />
  )
}
