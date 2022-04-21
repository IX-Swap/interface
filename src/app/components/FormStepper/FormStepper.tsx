import { Grid, Paper, Step, Typography } from '@mui/material'
import { FormStep } from 'app/components/FormStepper/FormStep'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ComponentType, useEffect, useMemo, useState } from 'react'
import { MutationResultPair } from 'react-query'
import { Stepper } from 'ui/Stepper/Stepper'
import { StepButton } from 'ui/Stepper/StepButton'

export interface FormStepperStep {
  label: string
  component: ComponentType
  getFormValues: any
  getRequestPayload: any
  validationSchema?: any
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

  const getCompleted = () => {
    if (data?.submitted === true) {
      return steps.length
    }

    if (shouldSaveOnMove) {
      return defaultActiveStep ?? data?.step ?? 0
    }

    return steps.length
  }
  const [completed, setCompleted] = React.useState<number[]>(
    Array.from(
      {
        length: getCompleted()
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
    if (nonLinear) {
      setCompleted([...completed, activeStep])
      setActiveStep(step)
      return
    }

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

  const getStepStatus = (
    step: FormStepperStep,
    index: number,
    activeStep: number
  ) => {
    const isValid: boolean =
      step.validationSchema?.isValidSync(step.getFormValues(data)) ?? false

    const lastStep = index === steps.length - 1
    return {
      active: index === activeStep,
      completed: lastStep
        ? data !== undefined
          ? data.status === 'Submitted' || data.status === 'Approved'
          : false
        : completed.includes(index)
        ? isValid
        : false,
      error: lastStep
        ? data?.status === 'Rejected'
        : completed.includes(index)
        ? !isValid
        : false
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        {stepsMemo.map((step, index) => (
          <FormStep
            key={`step-content-${index}`}
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
            completed={completed}
          />
        ))}
      </Grid>
      <Grid item xs={3}>
        <Paper sx={{ borderRadius: 2, py: 5 }}>
          <Typography variant='h6' sx={{ mb: 2, pl: 4 }}>
            Progress
          </Typography>
          <Stepper
            nonLinear={nonLinear}
            orientation='vertical'
            activeStep={activeStep}
          >
            {steps.map((formStep, index) => {
              const step = index + 1
              return (
                <Step key={formStep.label}>
                  <StepButton
                    step={step}
                    variantsConditions={getStepStatus(
                      formStep,
                      index,
                      activeStep
                    )}
                    onClick={handleStepButtonClick(index)}
                  >
                    {formStep.label}
                  </StepButton>
                </Step>
              )
            })}
          </Stepper>
        </Paper>
      </Grid>
    </Grid>
  )
}
