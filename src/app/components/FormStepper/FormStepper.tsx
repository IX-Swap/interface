import { Grid, Step, StepButton, StepLabel, Stepper } from '@mui/material'
import { FormStep } from 'app/components/FormStepper/FormStep'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ComponentType, useEffect, useMemo, useState } from 'react'
import { MutationResultPair } from 'react-query'

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
  defaultActiveStep?: number
  shouldSaveOnMove?: boolean
  nonLinear?: boolean
  skippable?: boolean
}

export const FormStepper = (props: FormStepperProps) => {
  const {
    steps,
    data,
    createMutation,
    editMutation,
    submitMutation,
    shouldSaveOnMove = true,
    defaultActiveStep,
    nonLinear = false,
    skippable = false
  } = props

  const stepsMemo = useMemo(() => steps, []) // eslint-disable-line
  const [completed, setCompleted] = React.useState<number[]>(
    Array.from(
      {
        length: shouldSaveOnMove
          ? defaultActiveStep ?? data?.step ?? 0
          : steps.length
      },
      (x, i) => i
    )
  )

  const { getFilterValue, updateFilter } = useQueryFilter()
  const stepFilter = getFilterValue('step')

  const getStepFilterValue = () => {
    const stepByFilterIndex = steps.findIndex(
      (step: FormStepperStep) => step.label === stepFilter
    )

    return stepByFilterIndex > -1 && completed.includes(stepByFilterIndex)
      ? stepByFilterIndex
      : undefined
  }

  const [activeStep, setActiveStep] = useState<number>(
    getStepFilterValue() ?? defaultActiveStep ?? data?.step ?? 0
  )

  const handleStepButtonClick = (step: number) => () => {
    if (completed.includes(step) || step === Math.max(...completed) + 1) {
      setActiveStep(step)
    }
  }

  const handleComplete = () => {
    if (!completed.includes(activeStep)) {
      setCompleted([...completed, activeStep])
    }
  }

  useEffect(() => {
    updateFilter('step', steps[activeStep]?.label)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep])

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Stepper activeStep={activeStep} alternativeLabel nonLinear={nonLinear}>
          {steps.map((step, index) => (
            <Step key={`step-${index}`} completed={completed.includes(index)}>
              {nonLinear ? (
                <StepButton
                  onClick={handleStepButtonClick(index)}
                  disableRipple
                  disabled={
                    !completed.includes(index) &&
                    index !== Math.max(...completed) + 1
                  }
                >
                  <StepLabel>{step.label}</StepLabel>
                </StepButton>
              ) : (
                <StepLabel>{step.label}</StepLabel>
              )}
            </Step>
          ))}
        </Stepper>
      </Grid>

      {stepsMemo.map((step, index) => (
        <Grid item key={`step-content-${index}`}>
          <FormStep
            step={step}
            index={index}
            totalSteps={steps.length}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setCompleted={handleComplete}
            data={data}
            createMutation={createMutation}
            editMutation={editMutation}
            submitMutation={submitMutation}
            shouldSaveOnMove={shouldSaveOnMove}
            skippable={skippable}
          />
        </Grid>
      ))}
    </Grid>
  )
}
