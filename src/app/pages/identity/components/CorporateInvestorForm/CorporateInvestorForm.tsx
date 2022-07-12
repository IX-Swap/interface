import React, { useEffect } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useCreateCorporate } from 'app/pages/identity/hooks/useCreateCorporate'
import { useUpdateCorporate } from 'app/pages/identity/hooks/useUpdateCorporate'
import { useSubmitCorporate } from 'app/pages/identity/hooks/useSubmitCorporate'
import { getCorporateInvestorFormSteps } from './steps'
import { useOnboardingJourneys } from 'app/hooks/onboarding/useOnboardingJourneys'
import { getIdentityDefaultActiveStep } from 'app/pages/identity/utils/shared'
import { generatePath, useHistory } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { CorporateIdentity } from '../../types/forms'
import { IdentitySubmitConfirmationDialog } from 'app/pages/identity/components/IdentitySubmitConfirmationDialog/IdentitySubmitConfirmationDialog'
import { useConfirmSubmitDialog } from 'app/pages/identity/hooks/useConfirmSubmitDialog'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'

export type CorporateType =
  | 'investor'
  | 'issuer'
  | 'Fund Manager'
  | 'Fund Administrator'
  | 'Portfolio Manager'

export interface CorporateInvestorFormProps {
  data?: CorporateIdentity
  type?: CorporateType
  formTitle?: string
}

export const CorporateInvestorForm = ({
  data,
  type = 'investor',
  formTitle
}: CorporateInvestorFormProps) => {
  const corporateInvestorFormSteps = getCorporateInvestorFormSteps(type)

  const { open, openDialog, closeDialog } = useConfirmSubmitDialog()

  const createMutation = useCreateCorporate(type)
  const updateMutation = useUpdateCorporate(type)
  const submitMutation = useSubmitCorporate(openDialog)
  const { isCorporateJourneyCompleted } = useOnboardingJourneys()
  const { data: corporateData, isLoading } = useAllCorporates({ type })
  const { location, replace } = useHistory()

  useEffect(() => {
    if (!isLoading) {
      if (
        corporateData !== undefined &&
        corporateData.list.length > 0 &&
        location.pathname === IdentityRoute.createCorporate
      ) {
        replace(
          generatePath(IdentityRoute.editCorporate, {
            identityId: corporateData.list[0]._id,
            userId: corporateData.list[0].user._id
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
    isSubmitted: corporateData?.list[0]?.status === 'Submitted',
    lastStepIndex: corporateInvestorFormSteps.length - 1,
    isJourneyCompleted: isCorporateJourneyCompleted
  })

  return (
    <>
      <IdentitySubmitConfirmationDialog open={open} closeDialog={closeDialog} />
      <FormStepper
        data={corporateData?.list[0]}
        createMutation={createMutation}
        editMutation={updateMutation}
        submitMutation={submitMutation}
        steps={corporateInvestorFormSteps}
        defaultActiveStep={defaultActiveStep}
        formTitle={formTitle}
        nonLinear
        createModeRedirect={IdentityRoute.editCorporate}
      />
    </>
  )
}
