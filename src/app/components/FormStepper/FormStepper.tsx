import { Grid, Paper, Step, useMediaQuery } from '@mui/material'
import { FormStep } from 'app/components/FormStepper/FormStep'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ComponentType, useEffect, useMemo, useState } from 'react'
import { MutationResultPair } from 'react-query'
import { Stepper } from 'ui/Stepper/Stepper'
import { StepButton } from 'ui/Stepper/StepButton'
import { useTheme } from '@mui/material/styles'
import { SaveDrafButton } from 'app/components/FormStepper/SaveDraftButton'

export interface FormStepperStep {
  label: string
  component: ComponentType
  getFormValues: any
  getRequestPayload: any
  validationSchema?: any
  formId?: string
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
  formTitle?: string
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
    skippable = false,
    formTitle
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

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

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
          ? data?.status === 'Submitted' || data?.status === 'Approved'
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

  console.log(getStepStatus(steps[activeStep], activeStep, activeStep).error)

  return (
    <Grid
      container
      spacing={2}
      direction={matches ? 'column-reverse' : undefined}
    >
      <Grid item xs={12} sm={9}>
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
          />
        ))}
      </Grid>
      <Grid item xs={12} sm={3}>
        <Paper
          sx={{
            borderRadius: 2,
            py: matches ? 2 : 5,
            px: matches ? 2 : undefined
          }}
        >
          <Stepper
            nonLinear={nonLinear}
            orientation={matches ? 'horizontal' : 'vertical'}
            activeStep={activeStep}
            title={matches ? steps[activeStep].label : 'Progress'}
            stepInfo={
              matches
                ? {
                    label: formTitle,
                    activeStep: activeStep + 1,
                    totalSteps: steps.length
                  }
                : undefined
            }
            actions={
              <SaveDrafButton
                isLastStep={activeStep === steps.length - 1}
                formId={`${steps[activeStep].formId ?? 'form'}-${activeStep}`}
                disabled={
                  (activeStep === steps.length - 1 &&
                    !(
                      (steps[activeStep].validationSchema?.isValidSync(
                        steps[activeStep].getFormValues(data)
                      ) as boolean) ?? true
                    )) ||
                  data?.status === 'Submitted' ||
                  data?.status === 'Approved'
                }
              />
            }
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
