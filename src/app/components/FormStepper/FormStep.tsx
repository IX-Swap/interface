import { Grid, Box } from '@material-ui/core'
import { FormStepperStep } from 'app/components/FormStepper/FormStepper'
import { MoveButton } from 'app/components/FormStepper/MoveButton'
import { SaveButton } from 'app/components/FormStepper/SaveButton'
import { Form } from 'components/form/Form'
import React, { createElement, Fragment, useEffect } from 'react'
import { MutationResultPair } from 'react-query'
import { SubmitButton } from './SubmitButton'
import { VSpacer } from 'components/VSpacer'

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
    submitMutation
  } = props

  const isCurrentStep = activeStep === index

  if (!isCurrentStep) {
    return null
  }

  const wasApproved = data?.authorizations.some(
    ({ status }: any) => status === 'Approved'
  )
  const hasNextStep = activeStep < totalSteps - 1
  const hasPrevStep = activeStep !== 0
  const isEditing = data !== undefined
  const isLastStep = activeStep === totalSteps - 1
  const saveMutation = isEditing ? editMutation : createMutation

  const goToNextStep = () => {
    if (hasNextStep) {
      setActiveStep(activeStep + 1)
    }
  }

  const goToPrevStep = () => {
    if (hasPrevStep) {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <Form
      defaultValues={step.getFormValues(data)}
      validationSchema={step.validationSchema}
    >
      <Grid item>{createElement(step.component)}</Grid>
      <VSpacer size='large' />

      <Grid item container justify='flex-end'>
        <Box display='flex'>
          {hasPrevStep && (
            <Fragment>
              <MoveButton
                activeStep={activeStep}
                shouldUpdateStep={!wasApproved}
                getRequestPayload={step.getRequestPayload}
                mutation={saveMutation}
                onClick={goToPrevStep}
                isBackButton
              >
                Back
              </MoveButton>
              <Box mx={1} />
            </Fragment>
          )}

          {!isLastStep && (
            <Fragment>
              <SaveButton
                step={index}
                transformData={step.getRequestPayload}
                mutation={saveMutation}
              />
              <Box mx={1} />
            </Fragment>
          )}

          {hasNextStep && (
            <MoveButton
              activeStep={activeStep}
              variant={'contained'}
              shouldUpdateStep={!wasApproved}
              getRequestPayload={step.getRequestPayload}
              mutation={saveMutation}
              onClick={goToNextStep}
            >
              Next
            </MoveButton>
          )}

          {isLastStep && (
            <SubmitButton mutation={submitMutation} data={data}>
              Submit
            </SubmitButton>
          )}
        </Box>
      </Grid>
    </Form>
  )
}
