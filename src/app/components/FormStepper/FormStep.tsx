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
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
  redirectOnSave?: (args: RedirectOnSaveArgs) => void
  redirectCallback?: (createModeRedirect: CreateModeRedirect, data: any) => void
  isRequiredOnLastStep?: boolean
  followDefaultMode?: boolean
  dataToCheck?: any
<<<<<<< Updated upstream
  isCreateMode?: {
    value: boolean
  }
  overRideStep?: boolean
=======
>>>>>>> Stashed changes
}

interface OnSubmitSuccessArgs {
  data: any
  isLastStep: boolean
  isEditing: boolean
  setCompleted?: () => void
  redirectCallback?: (createModeRedirect: CreateModeRedirect, data: any) => void
  createModeRedirect: CreateModeRedirect
  history: H.History
}

const onSubmitSuccess = ({
  data,
  isLastStep,
  isEditing,
  setCompleted,
  redirectCallback,
  createModeRedirect,
  history
}: OnSubmitSuccessArgs) => {
  if (isSuccessRequest(data?.status) && !isLastStep && isEditing) {
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
<<<<<<< Updated upstream
=======
>>>>>>> 440082842 (DSO Step 1 integration)
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    createModeRedirect
=======
>>>>>>> Stashed changes
    createModeRedirect,
    redirectCallback,
    redirectOnSave,
    isRequiredOnLastStep = false,
    followDefaultMode = true,
<<<<<<< Updated upstream
    dataToCheck = undefined,
    isCreateMode: hasCreateMode = undefined,
    overRideStep = false
=======
    dataToCheck = undefined
>>>>>>> 440082842 (DSO Step 1 integration)
>>>>>>> Stashed changes
  } = props
  const isCurrentStep = activeStep === index
  const classes = useStyles()
  const history = useHistory()

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

    const mutation =
      data === undefined
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
        redirectCallback,
        createModeRedirect,
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
