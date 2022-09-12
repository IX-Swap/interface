import { Grid, Paper, Step, useMediaQuery } from '@mui/material'
import { FormStep } from 'app/components/FormStepper/FormStep'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ComponentType, useMemo } from 'react'
import { MutationResultPair } from 'react-query'
import { Stepper } from 'ui/Stepper/Stepper'
import { StepButton } from 'ui/Stepper/StepButton'
import { useTheme } from '@mui/material/styles'
import { SaveDraftButton } from 'app/components/FormStepper/SaveDraftButton'
import { SubmitButton } from 'app/components/FormStepper/SubmitButton'
import { TwoFANotice } from 'app/components/FormStepper/TwoFANotice'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { useStyles } from './FormStepper.styles'
import { RedirectOnSaveArgs } from 'types/dso'

export interface FormStepperStep {
  label: string
  component: ComponentType
  getFormValues: any
  getRequestPayload: any
  validationSchema?: any
  initialValidationSchema?: any
  formId?: string
}

export type CreateModeRedirect = string | ((type: string) => string) | undefined

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
  createModeRedirect: CreateModeRedirect
  submitText?: string
  redirectOnSave?: (args: RedirectOnSaveArgs) => void
  redirectCallback?: (createModeRedirect: CreateModeRedirect, data: any) => void
  isRequiredOnLastStep?: boolean
}

export const FormStepper = (props: FormStepperProps) => {
  const classes = useStyles()
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
    formTitle,
    createModeRedirect,
    submitText,
    redirectOnSave,
    redirectCallback,
    isRequiredOnLastStep
  } = props

  const { isMobile } = useAppBreakpoints()

  const stepsMemo = useMemo(() => steps, []) // eslint-disable-line

  const getCompleted = () => {
    if (data?.submitted === true) {
      return steps.length
    }

    const dataStep = data?.step !== undefined ? (data?.step ?? 0) + 1 : 0 // eslint-disable-line

    if (shouldSaveOnMove) {
      return defaultActiveStep ?? dataStep ?? 0
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
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const getStepFilterValue: () => number | undefined = () => {
    const stepByFilterIndex = steps.findIndex(
      (step: FormStepperStep) => step.label === stepFilter
    )

    return stepByFilterIndex > -1 ? stepByFilterIndex : undefined
  }

  const activeStep: number = getStepFilterValue() ?? defaultActiveStep ?? 0

  const setActiveStep = (step: number) => {
    updateFilter('step', steps[step]?.label)
  }

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

  const getCompletedStatus = (lastStep: boolean, index: number) => {
    if (lastStep) {
      return data !== undefined
        ? data?.status === 'Submitted' || data?.status === 'Approved'
        : false
    }

    return completed.includes(index)
  }

  const getErrorStatus = (lastStep: boolean, index: number) => {
    if (lastStep) {
      return data?.status === 'Rejected'
    }
    return false
  }

  const getStepStatus = (
    step: FormStepperStep,
    index: number,
    activeStepValue: number
  ) => {
    const lastStep = index === steps.length - 1
    return {
      active: index === activeStepValue,
      completed: getCompletedStatus(lastStep, index),
      error: getErrorStatus(lastStep, index)
    }
  }

  return (
    <Grid container direction={matches ? 'column-reverse' : 'row'}>
      <Grid item className={classes.content}>
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
            createModeRedirect={createModeRedirect}
            redirectOnSave={redirectOnSave}
            redirectCallback={redirectCallback}
            isRequiredOnLastStep={isRequiredOnLastStep}
          />
        ))}
      </Grid>
      <Grid item container className={classes.rightBlock}>
        <Grid item className={classes.stepperBlock}>
          <Paper className={classes.stepperBlockWrapper}>
            <Stepper
              nonLinear={nonLinear}
              orientation={matches ? 'horizontal' : 'vertical'}
              activeStep={activeStep}
              title={matches ? formTitle : 'Progress'}
              stepInfo={{
                label: steps[activeStep].label,
                activeStep: activeStep + 1,
                totalSteps: steps.length
              }}
              actions={
                <Grid container spacing={2}>
                  {matches ? null : (
                    <Grid item xs={12}>
                      <SubmitButton
                        mutation={submitMutation}
                        data={data}
                        step={steps[steps.length - 1]}
                        fullWidth
                        size='medium'
                        submitText={submitText}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <SaveDraftButton
                      isLastStep={activeStep === steps.length - 1}
                      formId={`${
                        steps[activeStep].formId ?? 'form'
                      }-${activeStep}`}
                      disabled={
                        data?.status === 'Submitted' ||
                        data?.status === 'Approved'
                      }
                    />
                  </Grid>
                </Grid>
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
                      stepData={{
                        step: steps[index],
                        formData: data,
                        isLast: index === steps.length - 1,
                        shouldValidate: completed.includes(index)
                      }}
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
        {!isMobile && (
          <Grid item xs={12}>
            <TwoFANotice />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}
