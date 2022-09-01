import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName, getIdFromObj } from 'helpers/strings'
import {
  CreateModeRedirect,
  FormStepper
} from 'app/components/FormStepper/FormStepper'
import { useSubmitDSO } from 'app/pages/issuance/hooks/useSubmitDSO'

import { useCreateDSO } from 'app/pages/issuance/hooks/useCreateDSO'
import { useUpdateDSO } from 'app/pages/issuance/hooks/useUpdateDSO'
import { dsoFormSteps } from './steps'
import { generatePath, useHistory } from 'react-router-dom'
import { Location } from 'history'

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
    if (
      createModeRedirect !== undefined &&
      data?.user !== undefined &&
      dsoId !== ''
    ) {
      history.replace(
        generatePath(createModeRedirect as string, {
          issuerId: data?.user,
          dsoId: dsoId
        })
      )
    }
  }

  const redirectOnSave = (
    createModeRedirect: CreateModeRedirect,
    data: any,
    isCreateMode: boolean,
    nextLocation: Location<unknown> | undefined,
    setIsRedirecting: any
  ) => {
    if (
      createModeRedirect !== undefined &&
      isCreateMode &&
      nextLocation !== undefined &&
      data?.user !== undefined &&
      dsoId !== ''
    ) {
      history.replace(
        generatePath(`${createModeRedirect as string}${nextLocation.search}`, {
          issuerId: data?.user,
          dsoId: dsoId
        })
      )
      setIsRedirecting(false)
    }
  }

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
      submitText='DSO'
      redirectOnSave={redirectOnSave}
      redirectCallback={redirectCallback}
      isRequiredOnLastStep={true}
    />
  )
}
