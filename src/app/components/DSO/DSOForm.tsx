import { DigitalSecurityOffering } from 'types/dso'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName, getIdFromObj } from 'helpers/strings'
import { useCreateDSO } from 'app/pages/issuance/hooks/useCreateDSO'
import { useSubmitDSO } from 'app/pages/issuance/hooks/useSubmitDSO'
import { useUpdateDSO } from 'app/pages/issuance/hooks/useUpdateDSO'
import React from 'react'
import { useParams } from 'react-router-dom'
import { dsoFormSteps } from './steps'
import { transformDSOToFormValues } from 'app/components/DSO/utils'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useAuth } from 'hooks/auth/useAuth'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { DSOStepper } from './DSOFormStepper'

export interface DSOFormProps {
  data?: DigitalSecurityOffering
  isNew?: boolean
}

export const getCreateModeRedirect = (dsoId: string): string => {
  if (dsoId !== undefined) {
    return IssuanceRoute.edit
  }

  return IssuanceRoute.create
}

export const DSOForm = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data } = useDSOById(dsoId, issuerId)
  const { user } = useAuth()
  const dataProvider = transformDSOToFormValues(data)
  const createMutation = useCreateDSO()
  const editMutation = useUpdateDSO(dsoId, getIdFromObj(user) ?? issuerId)
  const submitMutation = useSubmitDSO(dsoId)
  useSetPageTitle(getOfferingName(data))

  return (
    <DSOStepper
      data={dataProvider}
      createMutation={createMutation}
      editMutation={editMutation}
      submitMutation={submitMutation}
      steps={dsoFormSteps}
      nonLinear
      formTitle='Create DSO'
      redirectFunction={getCreateModeRedirect}
      submitText='DSO'
      isRequiredOnLastStep={true}
      isNew={dsoId === undefined}
    />
  )
}
