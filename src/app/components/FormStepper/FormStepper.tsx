import React, { ComponentType, useState } from 'react'
import { Grid, Step, StepLabel, Stepper } from '@material-ui/core'
import { MutationResultPair } from 'react-query'
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
  data: any
  createMutation: MutationResultPair<any, any, any, any>
  editMutation: MutationResultPair<any, any, any, any>
  submitMutation: MutationResultPair<any, any, any, any>
}

export const FormStepper = (props: FormStepperProps) => {
  const { steps, data, createMutation, editMutation, submitMutation } = props
  const [activeStep, setActiveStep] = useState(data?.step ?? 0)

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
        <Grid item>
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
        </Grid>
      ))}
    </Grid>
  )
}
