import React from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useSubmitCorporate } from 'app/pages/_identity/hooks/useSubmitCorporate'
import { getIdentityDefaultActiveStep } from 'app/pages/_identity/utils/shared'
import { useAdminRouter } from 'app/pages/admin/router'
import { useAllCorporatesByUserId } from 'app/pages/admin/hooks/useAllCorporatesByUserId'
import { useCreateCorporateByUserId } from 'app/pages/admin/hooks/useCreateCorporateByUserId'
import { useUpdateCorporateByUserId } from 'app/pages/admin/hooks/useUpdateCorporateByUserId'
import { adminCorporateInvestorFormSteps } from 'app/pages/admin/components/AdminCorporateInvestorForm/steps'

export const AdminCorporateInvestorForm = () => {
  const {
    params: { userId }
  } = useAdminRouter()

  const { data, isLoading } = useAllCorporatesByUserId({
    userId,
    type: 'investor'
  })

  const identity = data.list[0]

  const createMutation = useCreateCorporateByUserId(userId, 'investor')
  const updateMutation = useUpdateCorporateByUserId(
    userId,
    identity?._id,
    'investor'
  )
  const submitMutation = useSubmitCorporate()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const defaultActiveStep = getIdentityDefaultActiveStep({
    isSubmitted: identity?.status === 'Submitted',
    lastStepIndex: adminCorporateInvestorFormSteps.length - 1,
    isJourneyCompleted: false
  })

  return (
    <FormStepper
      data={identity}
      createMutation={createMutation}
      editMutation={updateMutation}
      submitMutation={submitMutation}
      steps={adminCorporateInvestorFormSteps}
      defaultActiveStep={defaultActiveStep}
    />
  )
}
