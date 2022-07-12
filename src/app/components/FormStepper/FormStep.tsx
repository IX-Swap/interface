import { Grid, Box, Button } from '@mui/material'
import { FormStepperStep } from 'app/components/FormStepper/FormStepper'
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
  createModeRedirect?: string
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
    createModeRedirect
  } = props

  const isCurrentStep = activeStep === index
  const classes = useStyles()
  const history = useHistory()

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
      if (isSuccessRequest(data.status) && !isLastStep && isEditing) {
        //eslint-disable-line
        setCompleted?.()
      }
      if (!isEditing && createModeRedirect !== undefined) {
        history.replace(
          generatePath(createModeRedirect, {
            identityId: data?.data._id,
            userId: data?.data.user._id
          })
        )
      }
    }

    if (shouldSaveStep && (data?.step ?? 0) < activeStep + 1) {
      payload.step = activeStep
    }

    return await mutation(payload).then(onSubmitSuccess)
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
        isCreateMode={data === undefined}
        createModeRedirect={createModeRedirect}
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

          {hasPrevStep && !isLastStep && (
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
