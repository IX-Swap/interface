import { DigitalSecurityOffering } from 'types/dso'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName, getIdFromObj } from 'helpers/strings'
import { useCreateDSO } from 'app/pages/issuance/hooks/useCreateDSO'
import { useSubmitDSO } from 'app/pages/issuance/hooks/useSubmitDSO'
import { useUpdateDSO } from 'app/pages/issuance/hooks/useUpdateDSO'
import React, { useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { dsoFormSteps } from './steps'
import { transformDSOToFormValues } from 'app/components/DSO/utils'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useAuth } from 'hooks/auth/useAuth'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { DSOStepper } from 'app/components/DSO/DSOFormStepper'

export interface DSOFormProps {
  data?: DigitalSecurityOffering
  isNew?: boolean
}

export const getCreateModeRedirect = (
  isCreate: boolean,
  dsoId: string
): string => {
  if (!isCreate && dsoId !== undefined) {
    return IssuanceRoute.edit
  }
  if (isCreate && dsoId !== undefined) {
    return IssuanceRoute.create
  }
  return IssuanceRoute.createNew
}

export const DSOForm = () => {
  const { dsoId, issuerId } = useParams<{
    dsoId: string
    issuerId: string
  }>()
  const location = useLocation()
  const { data } = useDSOById(dsoId, issuerId)
  const { user } = useAuth()
  const dataProvider = transformDSOToFormValues(data)
  const createMutation = useCreateDSO()
  const editMutation = useUpdateDSO(dsoId, getIdFromObj(user) ?? issuerId)
  const submitMutation = useSubmitDSO(dsoId)
  useSetPageTitle(getOfferingName(data))
  const numRef = useRef(0)
  return (
    <DSOStepper
      numRef={numRef}
      rawData={data}
      data={dataProvider}
      createMutation={createMutation}
      editMutation={editMutation}
      submitMutation={submitMutation}
      steps={dsoFormSteps}
      nonLinear
      formTitle={'Create DSO'}
      redirectFunction={getCreateModeRedirect}
      submitText='DSO'
      isRequiredOnLastStep={true}
      isNew={location.pathname.includes('/create')}
    />
  )
}
