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
  | 'issuer'
  | 'corporate'
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
  type = 'corporate',
  formTitle
}: CorporateInvestorFormProps) => {
  const corporateInvestorFormSteps = getCorporateInvestorFormSteps(type)

  const { open, openDialog, closeDialog } = useConfirmSubmitDialog()

  const createMutation = useCreateCorporate()
  const updateMutation = useUpdateCorporate()
  const submitMutation = useSubmitCorporate(openDialog)
  const { isCorporateJourneyCompleted } = useOnboardingJourneys()
  const { data: corporateData, isLoading } = useAllCorporates({})
  const { location, replace } = useHistory()

  useEffect(() => {
    if (!isLoading) {
      if (
        corporateData !== undefined &&
        corporateData.list.length > 0 &&
        location.pathname === IdentityRoute.createCorporate
      ) {
        replace(
          generatePath(
            getCreateModeRedirect(corporateData.list[0].type ?? 'corporate'),
            {
              identityId: corporateData.list[0]._id,
              userId: corporateData.list[0].user._id
            }
          )
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

  const getCreateModeRedirect = (type: string) => {
    if (type === 'issuer') {
      return IdentityRoute.editIssuer
    }

    return IdentityRoute.editCorporate
  }

  return (
    <>
      <IdentitySubmitConfirmationDialog open={open} closeDialog={closeDialog} />
      <FormStepper
        // data={corporateData?.list[0]}
        data={data}
        createMutation={createMutation}
        editMutation={updateMutation}
        submitMutation={submitMutation}
        steps={corporateInvestorFormSteps}
        defaultActiveStep={defaultActiveStep}
        formTitle={formTitle}
        nonLinear
        createModeRedirect={getCreateModeRedirect}
      />
    </>
  )
}
