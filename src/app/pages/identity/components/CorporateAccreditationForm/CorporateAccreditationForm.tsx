import React, { useEffect } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useCreateCorporateAccreditation } from 'app/pages/identity/hooks/useCreateCorporateAccreditation'
import { useUpdateCorporateAccreditation } from 'app/pages/identity/hooks/useUpdateCorporateAccreditation'
import { useSubmitCorporateAccreditation } from 'app/pages/identity/hooks/useSubmitCorporateAccreditation'
import { getCorporateAccreditationFormSteps } from './steps'
import { useOnboardingJourneys } from 'app/hooks/onboarding/useOnboardingJourneys'
import { getIdentityDefaultActiveStep } from 'app/pages/identity/utils/shared'
import { generatePath, useHistory, useParams } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { CorporateIdentity } from '../../types/forms'
import { IdentitySubmitConfirmationDialog } from 'app/pages/identity/components/IdentitySubmitConfirmationDialog/IdentitySubmitConfirmationDialog'
import { useConfirmSubmitDialog } from 'app/pages/identity/hooks/useConfirmSubmitDialog'
import { useCorporateAccreditation } from 'app/pages/identity/hooks/useCorporateAccreditation'

export interface CorporateAccreditationFormProps {
  data?: CorporateIdentity
  formTitle?: string
}

export const CorporateAccreditationForm = ({
  data,
  formTitle
}: CorporateAccreditationFormProps) => {
  const params = useParams<{ identityId: string }>()
  const corporateAccreditationFormSteps = getCorporateAccreditationFormSteps()

  const { open, openDialog, closeDialog } = useConfirmSubmitDialog()

  const createMutation = useCreateCorporateAccreditation()
  const updateMutation = useUpdateCorporateAccreditation()
  const submitMutation = useSubmitCorporateAccreditation(openDialog)
  const { isCorporateJourneyCompleted } = useOnboardingJourneys()
  const { data: corporateData, isLoading } = useCorporateAccreditation(
    params.identityId
  )
  const { location, replace } = useHistory()
  useEffect(() => {
    if (!isLoading) {
      if (
        corporateData !== undefined &&
        location.pathname === IdentityRoute.createCorporateAccreditation
      ) {
        replace(
          generatePath(IdentityRoute.editCorporateAccreditation, {
            identityId: corporateData._id,
            userId: corporateData.user
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
    isSubmitted: corporateData?.status === 'Submitted',
    lastStepIndex: corporateAccreditationFormSteps.length - 1,
    isJourneyCompleted: isCorporateJourneyCompleted
  })

  return (
    <>
      <IdentitySubmitConfirmationDialog open={open} closeDialog={closeDialog} />
      <FormStepper
        data={data}
        // data={corporateData}
        createMutation={createMutation}
        editMutation={updateMutation}
        submitMutation={submitMutation}
        steps={corporateAccreditationFormSteps}
        defaultActiveStep={defaultActiveStep}
        formTitle={formTitle}
        nonLinear
        createModeRedirect={IdentityRoute.editCorporateAccreditation}
      />
    </>
  )
}
