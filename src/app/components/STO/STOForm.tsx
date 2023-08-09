import { Grid, Box, Paper } from '@mui/material'
import React from 'react'
import { getIdFromObj } from 'helpers/strings'
import * as H from 'history'
import { Form } from 'components/form/Form'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { isEmpty } from 'lodash'
import { useStyles } from 'app/components/FormStepper/FormStepper.styles'
import { useParams } from 'react-router-dom'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { DSOCompanyInformationFields } from 'app/components/DSO/components/DSOCompanyInformationFields'
import { DSODocumentsFields } from 'app/components/DSO/components/DSODocumentsFields'
import { DSOFormValues } from 'types/dso'
import { DSOInformationFields } from 'app/components/DSO/components/DSOInformationFields'
import {
  getSTOInformationFormValues,
  getCompanyInformationFormValues,
  getDocumentsFormValues,
  transformDSOToFormValues
} from 'app/components/DSO/utils'
import {
  getDSOCompanyInformationPayload,
  getDSODocumentsPayload,
  getDSOInformationRequestPayload
} from 'app/components/DSO/requests'
import { SaveDraftButton } from './SaveDraftButton'
import { SubmitButton } from './SubmitButton'
import { useCreateDSO } from 'app/pages/issuance/hooks/useCreateDSO'
import { useSubmitDSO } from 'app/pages/issuance/hooks/useSubmitDSO'
import { useUpdateDSO } from 'app/pages/issuance/hooks/useUpdateDSO'
import { useAuth } from 'hooks/auth/useAuth'
import { getSTOFormSchema } from 'validation/dso'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export interface onSubmitSuccessProps {
  data: any
  isLastStep: boolean
  isEditing: boolean
  setCompleted: () => void
  redirectFunction: (isCreate: boolean, dsoId: string) => string
  history: H.History
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

export interface StepSchemaProps {
  schema?: any
  data: any
}

export const getSchema = (props: StepSchemaProps) => {
  const { schema, data } = props
  if (typeof schema === 'function') {
    return schema(data)
  }
  return schema
}

export const getSubmitPayload = (data: any) => {
  const teams = isEmpty(data.teams) ? null : data.teams
  return {
    ...data,
    teams
  }
}

export const STOForm = () => {
  window.addEventListener('beforeunload', ev => {
    ev.preventDefault()
    return (ev.returnValue = 'Are you sure you want to close?')
  })

  const { dsoId, issuerId } = useParams<{
    dsoId: string
    issuerId: string
  }>()
  const formId = `stoForm`
  const classes: any = useStyles()
  const { isTablet } = useAppBreakpoints()
  const { user } = useAuth()
  const { data } = useDSOById(dsoId, issuerId)

  const transformedData = transformDSOToFormValues(data)
  const createMutation = useCreateDSO()
  const editMutation = useUpdateDSO(dsoId, getIdFromObj(user) ?? issuerId)
  const submitMutation = useSubmitDSO(dsoId)

  const mutation = data !== undefined ? editMutation[0] : createMutation[0]

  const validationSchema = (data: DSOFormValues | undefined) =>
    getSTOFormSchema(data)
  const schema = getSchema({
    schema: validationSchema,
    data
  })

  const getRequestPayload = (payloadData: any) => {
    const payload = {
      ...getDSOInformationRequestPayload(payloadData),
      ...getDSOCompanyInformationPayload(payloadData, true),
      ...getDSODocumentsPayload(payloadData, true)
    }

    delete payload.step
    return payload
  }

  const getFormValues = (data: DSOFormValues | undefined) => {
    const stoInformationFormValues = !isEmpty(data)
      ? getSTOInformationFormValues(data)
      : []

    return {
      ...stoInformationFormValues,
      ...getCompanyInformationFormValues(data),
      ...getDocumentsFormValues(data)
    }
  }

  return (
    <Form
      defaultValues={getFormValues(transformedData)}
      validationSchema={schema}
      id={formId}
    >
      <Grid container direction={isTablet ? 'column' : 'row'}>
        <Grid item xs={9} mb={2}>
          <DSOInformationFields />
          <DSOCompanyInformationFields />
          <DSODocumentsFields />
        </Grid>
        <Grid item xs={1}>
          <Box position='sticky' top={90}>
            <Grid item container className={classes.rightBlock}>
              <Grid item className={classes.stepperBlock}>
                <Paper className={classes.stepperBlockWrapper}>
                  <Grid
                    container
                    spacing={2}
                    display='flex'
                    justifyContent='center'
                    width='100%'
                    p={'0 10px 0 30px'}
                  >
                    <Grid item xs={12}>
                      <SaveDraftButton
                        formId={formId}
                        disabled={
                          data?.status === 'Submitted' ||
                          data?.status === 'Approved'
                        }
                        mutation={mutation}
                        transformData={getRequestPayload}
                        redirectFunction={getCreateModeRedirect}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SubmitButton
                        rawData={data}
                        mutation={submitMutation}
                        data={getSubmitPayload(transformedData)}
                        getFormValues={getFormValues}
                        customSchema={schema}
                        fullWidth
                        size='medium'
                        submitText={'STO'}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Form>
  )
}
