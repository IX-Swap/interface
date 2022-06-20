import { Grid, Box } from '@mui/material'
import { FormStepperStep } from 'app/components/FormStepper/FormStepper'
import { BackButton } from 'app/components/FormStepper/BackButton'
import { SaveButton } from 'app/components/FormStepper/SaveButton'
import { Form } from 'components/form/Form'
import React, { createElement, Fragment } from 'react'
import { MutationResultPair } from 'react-query'
import { SubmitButton } from './SubmitButton'
import { VSpacer } from 'components/VSpacer'
import { ScrollToTop } from 'components/ScrollToTop'
import { SkipButton } from 'app/components/FormStepper/SkipButton'
import { isSuccessRequest } from 'helpers/strings'
import { SaveOnNavigate } from 'app/components/FormStepper/SaveOnNavigate'
import { useStyles } from 'app/components/FormStepper/FormStep.styles'

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
    completed
  } = props

  const isCurrentStep = activeStep === index
  const classes = useStyles()

  if (!isCurrentStep) {
    return null
  }

  const hasNextStep = activeStep < totalSteps - 1
  const hasPrevStep = activeStep !== 0
  const isEditing = data !== undefined
  const isLastStep = activeStep === totalSteps - 1
  const saveMutation = isEditing ? editMutation : createMutation

  const handleSubmit = async (values: any) => {
    if (!shouldSaveOnMove) {
      setActiveStep(activeStep + 1)
      return
    }

    const isNew = data === undefined
    const mutation = isNew
      ? createMutation[0]
      : isLastStep
      ? submitMutation[0]
      : editMutation[0]
    const shouldSaveStep = shouldSaveOnMove && !isLastStep
    const payload = step.getRequestPayload(values)

    const onSubmitSuccess = (data: any) => {
      if (isSuccessRequest(data.status) && !isLastStep) {
        //eslint-disable-line
        setCompleted?.()
      }
    }

    if (shouldSaveStep && (data?.step ?? 0) < activeStep + 1) {
      payload.step = activeStep + 1
    }

    return await mutation(payload).then(onSubmitSuccess)
  }

  const getValidationSchema = () => {
    if (isLastStep) {
      return step.validationSchema
    }

    if (completed.includes(index)) {
      return step.validationSchema
    }

    return undefined
  }

  const nextCallback = () => {
    setCompleted?.()
    setActiveStep(activeStep + 1)
  }

  return (
    <Form
      defaultValues={step.getFormValues(data)}
      validationSchema={getValidationSchema()}
      onSubmit={handleSubmit}
      allowInvalid
      id={`${step.formId ?? 'form'}-${index}`}
    >
      <SaveOnNavigate
        transformData={step.getRequestPayload}
        mutation={saveMutation}
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

          {hasPrevStep && (
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
            <SaveButton
              fullWidth
              step={index}
              transformData={step.getRequestPayload}
              mutation={saveMutation}
              successCallback={nextCallback}
              variant='contained'
              color='primary'
            >
              Next
            </SaveButton>
          )}

          {isLastStep && (
            <SubmitButton
              fullWidth
              mutation={submitMutation}
              data={data}
              step={step}
            />
          )}
        </Box>
      </Grid>
      <ScrollToTop />
    </Form>
  )
}
