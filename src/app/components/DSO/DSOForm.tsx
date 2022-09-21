import { DigitalSecurityOffering, RedirectOnSaveArgs } from 'types/dso'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName, getIdFromObj } from 'helpers/strings'
import {
  CreateModeRedirect,
  FormStepper
} from 'app/components/FormStepper/FormStepper'
import { useCreateDSO } from 'app/pages/issuance/hooks/useCreateDSO'
import { useSubmitDSO } from 'app/pages/issuance/hooks/useSubmitDSO'
import { useUpdateDSO } from 'app/pages/issuance/hooks/useUpdateDSO'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { dsoFormSteps } from './steps'
import {
  redirect,
  redirectSave,
  transformDSOToFormValues
} from 'app/components/DSO/utils'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useAuth } from 'hooks/auth/useAuth'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export interface DSOFormProps {
  data?: DigitalSecurityOffering
  isNew?: boolean
}

export const getCreateModeRedirect = (dsoId: string) => {
  if (dsoId !== undefined) {
    return IssuanceRoute.edit
  }

  return IssuanceRoute.create
}

export const DSOForm = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data } = useDSOById(dsoId, issuerId)
  const { user } = useAuth()

  const createMutation = useCreateDSO()
  const editMutation = useUpdateDSO(dsoId, getIdFromObj(user) ?? issuerId)
  const submitMutation = useSubmitDSO(dsoId)
  const history = useHistory()
  useSetPageTitle(getOfferingName(data))

  const redirectCallback = (
    createModeRedirect: CreateModeRedirect,
    data: any
  ) => {
    redirect({ createModeRedirect, data, history, dsoId, issuerId })
  }

  const redirectOnSave = ({
    createModeRedirect,
    nextLocation,
    data,
    setIsRedirecting
  }: RedirectOnSaveArgs) => {
    redirectSave({
      createModeRedirect,
      nextLocation,
      data,
      dsoId: data?.data.id,
      history,
      setIsRedirecting,
      issuerId: data?.data.createdBy
    })
  }

  return (
    <FormStepper
      data={transformDSOToFormValues(data)}
      dataToCheck={transformDSOToFormValues(data)}
      followDefaultMode={data !== undefined}
      createMutation={createMutation}
      editMutation={editMutation}
      submitMutation={submitMutation}
      steps={dsoFormSteps}
      nonLinear
      formTitle='Create DSO'
      createModeRedirect={getCreateModeRedirect}
      submitText='DSO'
      redirectOnSave={redirectOnSave}
      redirectCallback={redirectCallback}
      isRequiredOnLastStep={true}
      isCreateMode={{ value: dsoId === undefined }}
    />
  )
}
