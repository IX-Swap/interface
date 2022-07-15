import React, { memo } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useCreateIndividualByUserId } from 'app/pages/admin/hooks/useCreateIndividualByUserId'
import { useSubmitIndividual } from 'app/pages/identity/hooks/useSubmitIndividual'
import { getIdentityDefaultActiveStep } from 'app/pages/identity/utils/shared'
import { useIndividualIdentityById } from 'app/pages/admin/hooks/useIndividualIdentityById'
import { adminIndividualInvestorFormSteps } from 'app/pages/admin/components/AdminIndividualInvestorForm/steps'
import { useParams } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'

export const AdminIndividualInvestorForm = memo(() => {
  const { userId } = useParams<{ userId: string }>()
  const { data, isLoading } = useIndividualIdentityById(userId)
  const mutation = useCreateIndividualByUserId(userId)
  const submitMutation = useSubmitIndividual()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (userId === undefined) {
    return null
  }

  const defaultActiveStep = getIdentityDefaultActiveStep({
    isSubmitted: data?.status === 'Submitted',
    lastStepIndex: adminIndividualInvestorFormSteps.length - 1,
    isJourneyCompleted: false
  })

  return (
    <FormStepper
      data={data}
      createMutation={mutation}
      editMutation={mutation}
      submitMutation={submitMutation}
      defaultActiveStep={defaultActiveStep}
      steps={adminIndividualInvestorFormSteps}
      shouldSaveOnMove
      createModeRedirect={IdentityRoute.editIndividual}
    />
  )
})
