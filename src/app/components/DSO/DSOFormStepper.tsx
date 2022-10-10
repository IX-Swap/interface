import { Grid, Paper, Step, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { ComponentType, useMemo } from 'react'
import { useStyles } from '../FormStepper/FormStepper.styles'
import { Stepper } from 'ui/Stepper/Stepper'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { StepButton } from 'ui/Stepper/StepButton'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { TwoFANotice } from 'app/components/FormStepper/TwoFANotice'
import { MutationResultPair } from 'react-query'
import { SubmitButton } from 'app/components/FormStepper/SubmitButton'
import { SaveDraftButton } from 'app/components/FormStepper/SaveDraftButton'
import { DSOFormStep } from './DSOFormStep'

export interface DSOStepperStep {
  label: string
  component: ComponentType
  getFormValues: any
  getRequestPayload: any
  validationSchema?: any
  initialValidationSchema?: any
  formId?: string
}

export interface DSOStepperProps {
  steps: DSOStepperStep[]
  data: any
  createMutation: MutationResultPair<any, any, any, any>
  editMutation: MutationResultPair<any, any, any, any>
  submitMutation: MutationResultPair<any, any, any, any>
  defaultActiveStep?: number
  shouldSaveOnMove?: boolean
  nonLinear?: boolean
  formTitle?: string
  submitText?: string
  isRequiredOnLastStep?: boolean
  isNew: boolean
  isLive?: boolean
  skippable?: boolean
  redirectFunction: (dsoId: string) => string
}

export const DSOStepper = (props: DSOStepperProps) => {
  const {
    steps,
    data,
    createMutation,
    editMutation,
    submitMutation,
    formTitle,
    shouldSaveOnMove = true,
    nonLinear = false,
    isNew = true,
    defaultActiveStep = 0,
    isRequiredOnLastStep = true,
    submitText,
    skippable = false,
    redirectFunction
  } = props

  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const { isMobile } = useAppBreakpoints()
  const { getFilterValue, updateFilter } = useQueryFilter()
  const stepFilter = getFilterValue('step')
  const stepsMemo = useMemo(() => steps, []) //eslint-disable-line

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

  const getStepFilterValue: () => number | undefined = () => {
    const stepByFilterIndex = steps.findIndex(
      (step: DSOStepperStep) => step.label === stepFilter
    )

    return stepByFilterIndex > -1 ? stepByFilterIndex : undefined
  }
  const setActiveStep = (step: number) => {
    updateFilter('step', steps[step]?.label)
  }

  const activeStep: number = getStepFilterValue() ?? defaultActiveStep ?? 0

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
    step: DSOStepperStep,
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
        {stepsMemo.map((step: any, index: number) => (
          <DSOFormStep
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
            isRequiredOnLastStep={isRequiredOnLastStep}
            isNew={isNew}
            redirectFunction={redirectFunction}
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
              {steps.map((formStep: any, index: number) => {
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
