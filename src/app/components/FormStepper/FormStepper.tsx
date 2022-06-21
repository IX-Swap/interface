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
    formTitle
  } = props

  const { isMobile } = useAppBreakpoints()

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
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const getStepFilterValue = () => {
    const stepByFilterIndex = steps.findIndex(
      (step: FormStepperStep) => step.label === stepFilter
    )

    return stepByFilterIndex > -1 ? stepByFilterIndex : undefined
  }

  const activeStep: number =
    getStepFilterValue() ?? defaultActiveStep ?? data?.step ?? 0

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
