import React, { useEffect } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useOnboardingJourneys } from 'app/hooks/onboarding/useOnboardingJourneys'
import { getIdentityDefaultActiveStep } from 'app/pages/identity/utils/shared'
import { generatePath, useHistory, useParams } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { IndividualIdentity } from '../../types/forms'
import { IdentitySubmitConfirmationDialog } from 'app/pages/identity/components/IdentitySubmitConfirmationDialog/IdentitySubmitConfirmationDialog'
import { useConfirmSubmitDialog } from 'app/pages/identity/hooks/useConfirmSubmitDialog'
import { useCreateIndividualAccreditation } from '../../hooks/useCreateIndividualAccreditation'
import { useIndividualAccreditation } from '../../hooks/useIndividualAccreditation'
import { getIndividualAccreditationFormSteps } from './steps'
import { useUpdateIndividualAccreditation } from '../../hooks/useUpdateIndividualAccreditation'
import { useSubmitIndividualAccreditation } from '../../hooks/useSubmitIndividualAccreditation'

export interface IndividualAccreditationFormProps {
  data?: IndividualIdentity
  formTitle?: string
}

export const IndividualAccreditationForm = ({
  data,
  formTitle
}: IndividualAccreditationFormProps) => {
  const params = useParams<{ identityId: string }>()
  const individualAccreditationFormSteps = getIndividualAccreditationFormSteps()

  const { open, openDialog, closeDialog } = useConfirmSubmitDialog()

  const createMutation = useCreateIndividualAccreditation()
  const updateMutation = useUpdateIndividualAccreditation()
  const submitMutation = useSubmitIndividualAccreditation(openDialog) // this
  const { isIndividualJourneyCompleted } = useOnboardingJourneys()
  const { data: individualData, isLoading } = useIndividualAccreditation(
    params.identityId
  )
  const { location, replace } = useHistory()
  useEffect(() => {
    if (!isLoading) {
      if (
        individualData !== undefined &&
        location.pathname === IdentityRoute.createIndividualAccreditation
      ) {
        replace(
          generatePath(IdentityRoute.editIndividualAccreditation, {
            identityId: individualData._id,
            userId: individualData.user
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
    isSubmitted: individualData?.accreditationStatus === 'Submitted',
    lastStepIndex: individualAccreditationFormSteps.length - 1,
    isJourneyCompleted: isIndividualJourneyCompleted
  })

  return (
    <>
      <IdentitySubmitConfirmationDialog open={open} closeDialog={closeDialog} />
      <FormStepper
        // data={data}
        data={individualData}
        statusFieldName={'accreditationStatus'}
        createMutation={createMutation}
        editMutation={updateMutation}
        submitMutation={submitMutation}
        steps={individualAccreditationFormSteps}
        defaultActiveStep={defaultActiveStep}
        formTitle={formTitle}
        nonLinear
        submitText='Accreditation'
        createModeRedirect={IdentityRoute.editIndividualAccreditation}
      />
    </>
  )
}
