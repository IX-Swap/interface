import { DigitalSecurityOffering } from 'types/dso'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
<<<<<<< Updated upstream
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
=======
<<<<<<< HEAD
import { getOfferingName } from 'helpers/strings'
import { getDSOValidationSchema } from 'validation/dso'
import { DSOSidebar } from 'app/components/DSO/components/DSOSidebar'
import { DSOFormActions } from 'app/components/DSO/components/DSOFormActions'
import { DSOFormFields } from 'app/components/DSO/components/DSOFormFields'
=======
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
>>>>>>> 440082842 (DSO Step 1 integration)
>>>>>>> Stashed changes

export interface DSOFormProps {
  data?: DigitalSecurityOffering
  isNew?: boolean
}

<<<<<<< Updated upstream
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
=======
<<<<<<< HEAD
export const DSOForm = (props: DSOFormProps) => {
  const { data, isNew = false } = props
  const isLive = isDSOLive(data)
  const validationSchema = useMemo(() => {
    return getDSOValidationSchema(isNew, isLive)
  }, [isNew, isLive])
  useSetPageTitle(getOfferingName(data))
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    <DSOStepper
      numRef={numRef}
      rawData={data}
      data={dataProvider}
=======
    <Form
      validationSchema={validationSchema}
      defaultValues={transformDSOToFormValues(data)}
      data-testid='dso-form'
    >
      <Grid container>
        <Grid item lg={9} container direction='column'>
          <DSOFormFields isNew={isNew} isLive={isLive} />
        </Grid>

        <Grid item lg={3}>
          <DSOSidebar
            isNew
            dso={data}
            footer={<DSOFormActions dso={data} schema={validationSchema} />}
          />
        </Grid>
      </Grid>
    </Form>
=======
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
      setIsRedirecting,
      issuerId
    })
  }

  const getCreateModeRedirect = () => {
    if (dsoId !== undefined) {
      return IssuanceRoute.edit
    }

    return IssuanceRoute.create
  }

  return (
    <FormStepper
      data={transformDSOToFormValues(data)}
      dataToCheck={transformDSOToFormValues(data)}
      rawData={data}
      followDefaultMode={data !== undefined}
>>>>>>> Stashed changes
      createMutation={createMutation}
      editMutation={editMutation}
      submitMutation={submitMutation}
      steps={dsoFormSteps}
      nonLinear
<<<<<<< Updated upstream
      formTitle={'Create DSO'}
      redirectFunction={getCreateModeRedirect}
      submitText='DSO'
      isRequiredOnLastStep={true}
      isNew={location.pathname.includes('/create')}
    />
=======
      formTitle='Create DSO'
      createModeRedirect={getCreateModeRedirect}
      submitText='DSO'
      redirectOnSave={redirectOnSave}
      redirectCallback={redirectCallback}
      isRequiredOnLastStep={true}
    />
>>>>>>> 440082842 (DSO Step 1 integration)
>>>>>>> Stashed changes
  )
}
