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
import { useHistory } from 'react-router-dom'
import { dsoFormSteps } from './steps'
import {
  redirect,
  redirectSave,
  transformDSOToFormValues
} from 'app/components/DSO/utils'

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
  const history = useHistory()

  const redirectCallback = (
    createModeRedirect: CreateModeRedirect,
    data: any
  ) => {
    redirect({ createModeRedirect, data, history, dsoId })
  }

  const redirectOnSave = ({
    createModeRedirect,
    isCreateMode,
    nextLocation,
    data,
    setIsRedirecting
  }: RedirectOnSaveArgs) => {
    redirectSave({
      createModeRedirect,
      isCreateMode,
      nextLocation,
      data,
      dsoId,
      history,
      setIsRedirecting
    })
  }

  useSetPageTitle(getOfferingName(data))

  return (
    <FormStepper
      data={transformDSOToFormValues(data)}
      createMutation={createMutation}
      editMutation={editMutation}
      submitMutation={submitMutation}
      steps={dsoFormSteps}
      nonLinear
      formTitle='Create DSO'
      createModeRedirect={undefined}
      submitText='DSO'
      redirectOnSave={redirectOnSave}
      redirectCallback={redirectCallback}
      isRequiredOnLastStep={true}
    />
  )
}
