import { Grid, Box, Button } from '@mui/material'
import { BackButton } from 'app/components/FormStepper/BackButton'
import { Form } from 'components/form/Form'
import React, { createElement, Fragment } from 'react'
import { VSpacer } from 'components/VSpacer'
import { ScrollToTop } from 'components/ScrollToTop'
import { SkipButton } from 'app/components/FormStepper/SkipButton'
import { isSuccessRequest } from 'helpers/strings'
import { useStyles } from 'app/components/FormStepper/FormStep.styles'
import { useHistory, generatePath } from 'react-router-dom'
import { DSOSaveOnNavigate } from './DSOSaveOnNavigate'
import { MutationResultPair } from 'react-query'
import { FormStepperStep } from '../FormStepper/FormStepper'
import * as H from 'history'

export interface onSubmitSuccessProps {
  data: any
  isLastStep: boolean
  isEditing: boolean
  setCompleted: () => void
  redirectFunction: (dsoId: string) => string
  history: H.History
}
const onSubmitSuccess = ({
  data,
  isLastStep,
  isEditing,
  setCompleted,
  redirectFunction,
  history
}: onSubmitSuccessProps) => {
  if (isSuccessRequest(data?.status) && !isLastStep && isEditing) {
    //eslint-disable-line
    setCompleted?.()
  }
  const redirect = redirectFunction(data?.data._id)

  console.log('redirect', redirect)
  history.replace(
    generatePath(redirect, {
      dsoId: data?.data._id,
      issuerId: data?.data.user._id
    })
  )
}

export interface DSOFormStepProps {
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
  setCompleted: () => void
  skippable?: boolean
  completed: number[]
  isRequiredOnLastStep?: boolean
  isNew: boolean
  redirectFunction: (dsoId: string) => string
}

export const DSOFormStep = (props: DSOFormStepProps) => {
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
    redirectFunction,
    isRequiredOnLastStep = false,
    isNew = true
  } = props
  const isCurrentStep = activeStep === index
  const classes = useStyles()
  const history = useHistory()

  if (!isCurrentStep) {
    return null
  }

  const hasNextStep = activeStep < totalSteps - 1

  const hasPrevStep = activeStep !== 0
  const isEditing = !isNew
  const isLastStep = activeStep === totalSteps - 1
  const saveMutation = isEditing ? editMutation : createMutation

  const handleSubmit = async (values: any) => {
    if (!shouldSaveOnMove) {
      setActiveStep(activeStep + 1)
      return
    }
    const mutation = isNew
      ? createMutation[0]
      : isLastStep
      ? submitMutation[0]
      : editMutation[0]
    const shouldSaveStep = shouldSaveOnMove && !isLastStep
    const payload = step.getRequestPayload(values)

    const onSuccessfulSubmit = (data: any) => {
      onSubmitSuccess({
        data,
        isLastStep,
        isEditing,
        setCompleted,
        redirectFunction,
        history
      })
    }
    if (shouldSaveStep && (data?.step ?? 0) < activeStep + 1) {
      payload.step = activeStep
    }

    return await mutation(payload).then(onSuccessfulSubmit)
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
      <DSOSaveOnNavigate
        transformData={step.getRequestPayload}
        mutation={saveMutation}
        isNew={isNew}
        redirectFunction={redirectFunction}
        activeStep={activeStep}
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
