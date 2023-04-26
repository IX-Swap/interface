import { Grid, Box, Button } from '@mui/material'
import {
  CreateModeRedirect,
  FormStepperStep
} from 'app/components/FormStepper/FormStepper'
import { BackButton } from 'app/components/FormStepper/BackButton'
import { Form } from 'components/form/Form'
import React, { createElement, Fragment } from 'react'
import { MutationResultPair } from 'react-query'
import { VSpacer } from 'components/VSpacer'
import { ScrollToTop } from 'components/ScrollToTop'
import { SkipButton } from 'app/components/FormStepper/SkipButton'
import { isSuccessRequest } from 'helpers/strings'
import { SaveOnNavigate } from 'app/components/FormStepper/SaveOnNavigate'
import { useStyles } from 'app/components/FormStepper/FormStep.styles'
import { useHistory, generatePath } from 'react-router-dom'
import * as H from 'history'
import { RedirectOnSaveArgs } from 'types/dso'

export interface FormStepProps {
  step: FormStepperStep
  data: any
  index: number
  activeStep: number
  setActiveStep: (index: number) => void
  totalSteps: number
  createMutation: MutationResultPair<any, any, any, any>
  editMutation: MutationResultPair<any, any, any, any>
  submitMutation: MutationResultPair<any, any, any, any>
  shouldSaveOnMove: boolean
  setCompleted?: () => void
  skippable?: boolean
  completed: number[]
  createModeRedirect: CreateModeRedirect
  redirectOnSave?: (args: RedirectOnSaveArgs) => void
  redirectCallback?: (createModeRedirect: CreateModeRedirect, data: any) => void
  isRequiredOnLastStep?: boolean
  followDefaultMode?: boolean
  dataToCheck?: any
  isCreateMode?: {
    value: boolean
  }
  overRideStep?: boolean
  statusFieldName?: string
}

interface OnSubmitSuccessArgs {
  data: any
  isLastStep: boolean
  isEditing: boolean
  setCompleted?: () => void
  redirectCallback?: (createModeRedirect: CreateModeRedirect, data: any) => void
  createModeRedirect: CreateModeRedirect
  history: H.History
  statusFieldName: string
}

const onSubmitSuccess = ({
  data,
  isLastStep,
  isEditing,
  setCompleted,
  redirectCallback,
  createModeRedirect,
  history,
  statusFieldName
}: OnSubmitSuccessArgs) => {
  if (isSuccessRequest(data?.[statusFieldName]) && !isLastStep && isEditing) {
    //eslint-disable-line
    setCompleted?.()
  }
  if (redirectCallback !== undefined) {
    redirectCallback(createModeRedirect, data)
  } else if (!isEditing && createModeRedirect !== undefined) {
    const redirect =
      typeof createModeRedirect === 'function'
        ? createModeRedirect(data?.data.type ?? 'corporate')
        : createModeRedirect

    history.replace(
      generatePath(redirect, {
        identityId: data?.data._id,
        userId: data?.data.user._id
      })
    )
  }
}

export const FormStep = (props: FormStepProps) => {
  const {
    index,
    activeStep,
    setActiveStep,
    totalSteps,
    step,
    data,
    createMutation,
    editMutation,
    submitMutation,
    shouldSaveOnMove,
    setCompleted,
    skippable,
    completed,
    createModeRedirect,
    redirectCallback,
    redirectOnSave,
    isRequiredOnLastStep = false,
    followDefaultMode = true,
    dataToCheck = undefined,
    isCreateMode: hasCreateMode = undefined,
    overRideStep = false,
    statusFieldName = 'status'
  } = props
  const isCurrentStep = activeStep === index
  const classes = useStyles()
  const history = useHistory()
  console.log(props, 'akl')
  if (!isCurrentStep) {
    return null
  }

  const hasNextStep = activeStep < totalSteps - 1
  const hasPrevStep = activeStep !== 0
  const isEditing = followDefaultMode
    ? data !== undefined
    : Object.is(data, dataToCheck)
  const isLastStep = activeStep === totalSteps - 1
  const saveMutation = isEditing ? editMutation : createMutation

  const handleSubmit = async (values: any) => {
    if (!shouldSaveOnMove) {
      setActiveStep(activeStep + 1)
      return
    }
    const formValues = isLastStep ? data : values
    const mutation =
      data === undefined
        ? createMutation[0]
        : isLastStep
        ? submitMutation[0]
        : editMutation[0]
    const shouldSaveStep = shouldSaveOnMove && !isLastStep
    const payload = step.getRequestPayload(formValues)

    const onSuccessfulSubmit = (data: any) => {
      onSubmitSuccess({
        data,
        isLastStep,
        isEditing,
        setCompleted,
        redirectCallback,
        createModeRedirect,
        history,
        statusFieldName
      })
    }
    if (shouldSaveStep && (data?.step ?? 0) < activeStep + 1) {
      payload.step = activeStep
    }

    return await mutation({ _id: data?._id, ...payload }).then(
      onSuccessfulSubmit
    )
  }

  const nextCallback = () => {
    setCompleted?.()
    setActiveStep(activeStep + 1)
  }

  const getSchema = (schema?: any) => {
    if (typeof schema === 'function') {
      return schema(data)
    }
    return schema
  }

  return (
    <Form
      defaultValues={step.getFormValues(data)}
      validationSchema={
        completed.includes(index)
          ? getSchema(step.validationSchema)
          : getSchema(step.initialValidationSchema)
      }
      onSubmit={handleSubmit}
      allowInvalid
      id={`${step.formId ?? 'form'}-${index}`}
    >
      <SaveOnNavigate
        transformData={step.getRequestPayload}
        mutation={saveMutation}
        isCreateMode={
          hasCreateMode !== undefined ? hasCreateMode.value : data === undefined
        }
        createModeRedirect={createModeRedirect}
        activeStep={activeStep}
        redirectOnSave={redirectOnSave}
        overRideStep={overRideStep}
      />
      <Grid item>{createElement(step.component)}</Grid>
      <VSpacer size='small' />

      <Grid item container justifyContent='flex-end'>
        <Box className={classes.stepButtons}>
          {skippable !== undefined && skippable && !isLastStep && (
            <Fragment>
              <SkipButton mutation={saveMutation} />
              <Box mx={1} />
            </Fragment>
          )}

          {hasPrevStep &&
            (!isRequiredOnLastStep ? !isLastStep : isRequiredOnLastStep) && (
              <Fragment>
                <BackButton
                  fullWidth
                  mutation={editMutation}
                  getRequestPayload={step.getRequestPayload}
                  shouldSaveStep={shouldSaveOnMove}
                  nextStep={activeStep - 1}
                  setActiveStep={setActiveStep}
                  isLastStep={isLastStep}
                >
                  Back
                </BackButton>
                <Box mx={1} />
              </Fragment>
            )}

          {hasNextStep && (
            <Button
              fullWidth
              variant='contained'
              color='primary'
              onClick={nextCallback}
              size='large'
            >
              Next
            </Button>
          )}
        </Box>
      </Grid>
      <ScrollToTop />
    </Form>
  )
}
