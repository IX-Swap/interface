import React from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { getIdentityDefaultActiveStep } from 'app/pages/identity/utils/shared'
import { useAllCorporatesByUserId } from 'app/pages/admin/hooks/useAllCorporatesByUserId'
import { useCreateCorporateByUserId } from 'app/pages/admin/hooks/useCreateCorporateByUserId'
import { useUpdateCorporateByUserId } from 'app/pages/admin/hooks/useUpdateCorporateByUserId'
import { adminCorporateInvestorFormSteps } from 'app/pages/admin/components/AdminCorporateInvestorForm/steps'
import { useSubmitCorporateById } from 'app/pages/admin/hooks/useSubmitCorporateById'
import { useParams } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'

export const AdminCorporateInvestorForm = () => {
  const { userId } = useParams<{ userId: string }>()

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
  const submitMutation = useSubmitCorporateById(userId, identity?._id)

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
      shouldSaveOnMove
      createModeRedirect={IdentityRoute.editCorporate}
    />
  )
}
