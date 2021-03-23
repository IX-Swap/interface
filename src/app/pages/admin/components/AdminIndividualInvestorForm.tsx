import React, { memo } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useCreateIndividualAsAdmin } from 'app/pages/admin/hooks/useCreateIndividualAsAdmin'
import { useSubmitIndividual } from 'app/pages/_identity/hooks/useSubmitIndividual'
import { individualInvestorFormSteps } from 'app/pages/_identity/components/IndividualInvestorForm/steps'
import { getIdentityDefaultActiveStep } from 'app/pages/_identity/utils/shared'
import { useAdminRouter } from 'app/pages/admin/router'
import { useIndividualIdentityById } from 'app/pages/admin/hooks/useIndividualIdentityById'

export const AdminIndividualInvestorForm = memo(() => {
  const {
    params: { userId }
  } = useAdminRouter()
  const { data, isLoading, isError } = useIndividualIdentityById(userId)
  const mutation = useCreateIndividualAsAdmin(userId)
  const submitMutation = useSubmitIndividual()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (userId === undefined || isError) {
    return null
  }

  const defaultActiveStep = getIdentityDefaultActiveStep({
    isSubmitted: data?.status === 'Submitted',
    lastStepIndex: individualInvestorFormSteps.length - 1,
    isJourneyCompleted: false
  })

  return (
    <FormStepper
      data={data}
      createMutation={mutation}
      editMutation={mutation}
      submitMutation={submitMutation}
      defaultActiveStep={defaultActiveStep}
      steps={individualInvestorFormSteps}
    />
  )
})
