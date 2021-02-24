import React, { ComponentType, createElement, Fragment, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  Hidden,
  Step,
  StepLabel,
  Stepper
} from '@material-ui/core'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'
import { SaveButton } from 'app/components/FormStepper/SaveButton'
import { MutationResultPair } from 'react-query'
import { getIdentityFormDefaultValue } from 'app/pages/identity/utils'
import { individualIdentityFormValidationSchema } from 'validation/identities'
import { MoveButton } from 'app/components/FormStepper/MoveButton'
import { FormStep } from 'app/components/FormStepper/FormStep'

export interface FormStepperStep {
  label: string
  component: ComponentType
  getFormValues: any
  getRequestPayload: any
  validationSchema: any
}

export interface FormStepperProps {
  steps: FormStepperStep[]
  defaultActiveStep?: number
  data: any
  createMutation: MutationResultPair<any, any, any, any>
  editMutation: MutationResultPair<any, any, any, any>
  submitMutation: MutationResultPair<any, any, any, any>
}

export const FormStepper = (props: FormStepperProps) => {
  const {
    defaultActiveStep = 0,
    steps,
    data,
    createMutation,
    editMutation,
    submitMutation
  } = props
  const [activeStep, setActiveStep] = useState(defaultActiveStep)

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={`step-${index}`}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>

      {steps.map((step, index) => (
        <FormStep
          key={`step-content-${index}`}
          step={step}
          index={index}
          totalSteps={steps.length}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          data={data}
          createMutation={createMutation}
          editMutation={editMutation}
          submitMutation={submitMutation}
        />
      ))}
    </Grid>
  )
}
