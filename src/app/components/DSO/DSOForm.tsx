import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName, getIdFromObj } from 'helpers/strings'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useSubmitDSO } from 'app/pages/issuance/hooks/useSubmitDSO'

import { useCreateDSO } from 'app/pages/issuance/hooks/useCreateDSO'
import { useUpdateDSO } from 'app/pages/issuance/hooks/useUpdateDSO'
import { dsoFormSteps } from './steps'

export interface DSOFormProps {
  data?: DigitalSecurityOffering
  isNew?: boolean
}

export const DSOForm = (props: DSOFormProps) => {
  const { data } = props

  const dsoId = getIdFromObj(data)
  const createMutation = useCreateDSO()
  const editMutation = useUpdateDSO(dsoId, data?.user ?? '')
  const submitMutation = useSubmitDSO(dsoId)

  useSetPageTitle(getOfferingName(data))

  return (
    <FormStepper
      data={data}
      createMutation={createMutation}
      editMutation={editMutation}
      submitMutation={submitMutation}
      steps={dsoFormSteps}
      nonLinear
      formTitle='Create DSO'
      createModeRedirect={undefined}
    />
  )
}
