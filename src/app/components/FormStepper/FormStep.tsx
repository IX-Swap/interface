import { Grid, Box } from '@mui/material'
import { FormStepperStep } from 'app/components/FormStepper/FormStepper'
import { BackButton } from 'app/components/FormStepper/BackButton'
import { SaveButton } from 'app/components/FormStepper/SaveButton'
import { Form } from 'components/form/Form'
import React, { createElement, Fragment } from 'react'
import { MutationResultPair } from 'react-query'
import { SubmitButton } from './SubmitButton'
import { VSpacer } from 'components/VSpacer'
import { NextButton } from 'app/components/FormStepper/NextButton'
import { ScrollToTop } from 'components/ScrollToTop'
import { SkipButton } from 'app/components/FormStepper/SkipButton'

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
    skippable
  } = props

  const isCurrentStep = activeStep === index

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
      if (data?.message === 'OK' && !isLastStep) {
        setCompleted?.()
        setActiveStep(activeStep + 1)
      }
    }

    if (shouldSaveStep) {
      payload.step = activeStep + 1
    }

    return await mutation(payload).then(onSubmitSuccess)
  }

  return (
    <Form
      defaultValues={step.getFormValues(data)}
      validationSchema={step.validationSchema}
      onSubmit={handleSubmit}
    >
      <Grid item>{createElement(step.component)}</Grid>
      <VSpacer size='large' />

      <Grid item container justifyContent='flex-end'>
        <Box display='flex'>
          {skippable !== undefined && skippable && !isLastStep && (
            <Fragment>
              <SkipButton mutation={saveMutation} />
              <Box mx={1} />
            </Fragment>
          )}

          {hasPrevStep && (
            <Fragment>
              <BackButton
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

          {!isLastStep && (
            <Fragment>
              <SaveButton
                step={index}
                transformData={step.getRequestPayload}
                mutation={saveMutation}
              >
                {shouldSaveOnMove ? 'Save & Finish Later' : 'Update'}
              </SaveButton>
              <Box mx={1} />
            </Fragment>
          )}

          {hasNextStep && <NextButton />}

          {isLastStep && <SubmitButton mutation={submitMutation} data={data} />}
        </Box>
      </Grid>
      <ScrollToTop />
    </Form>
  )
}
