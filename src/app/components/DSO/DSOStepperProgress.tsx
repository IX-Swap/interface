import React from 'react'
import { useStyles } from '../FormStepper/FormStepper.styles'
import { Stepper } from 'ui/Stepper/Stepper'
import { Grid, Paper, Step } from '@mui/material'
import { StepButton } from 'ui/Stepper/StepButton'
import { TwoFANotice } from '../FormStepper/TwoFANotice'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { SubmitButton } from 'app/components/FormStepper/SubmitButton'
import { SaveDraftButton } from './DSODraftButton'
import { DSOStepperStep } from './DSOFormStepper'
import { MutateFunction, MutationResultPair } from 'react-query'
import { useFormContext } from 'react-hook-form'
import { useDSOFormContext } from './DSOFormContext'
export interface DSOStepperProgressProps {
  transformData: any
  saveMutation: MutationResultPair<any, any, any, any>
  nonLinear: boolean
  matches: boolean
  activeStep: number
  formTitle: string
  steps: DSOStepperStep[]
  submitText: string
  submitMutation: MutationResultPair<any, any, any, any>
  data: any
  mutation: MutateFunction<any, any, any, any>
  getStepStatus: (
    step: DSOStepperStep,
    index: number,
    activeStepValue: number
  ) => {
    active: boolean
    completed: boolean
    error: boolean
  }
  completed: number[]
  handleStepButtonClick: (
    step: number,
    save?: any,
    transformData?: any
  ) => () => void
  redirectFunction: (dsoId: string) => string
}

export const DSOStepperProgress = (props: DSOStepperProgressProps) => {
  const {
    transformData,
    saveMutation,
    nonLinear,
    matches,
    activeStep,
    formTitle,
    steps,
    submitText,
    submitMutation,
    data,
    mutation,
    getStepStatus,
    completed,
    handleStepButtonClick,
    redirectFunction
  } = props
  const classes = useStyles()
  const { isMobile } = useAppBreakpoints()
  const [save] = saveMutation
  const { watch, errors } = useFormContext()
  const values = watch()
  const payload = transformData(values)
  const { stepValues, setStepValues } = useDSOFormContext()

  const handleSave = async () => {
    // eslint-disable-next-line
    const newValues = [...stepValues]
    newValues[activeStep] = { values, errors: { ...errors } }

    setStepValues(newValues)
    return await save({
      ...payload
    })
  }
  return (
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
                      data?.status === 'Approved' ||
                      activeStep < 2
                    }
                    mutation={mutation}
                    transformData={steps[activeStep].getRequestPayload}
                    redirectFunction={redirectFunction}
                    search={
                      '?step=' + steps[activeStep].label.replace(' ', '+')
                    }
                  />
                </Grid>
              </Grid>
            }
          >
            {steps.map((formStep: any, index: number) => {
              const step = index + 1
              return (
                <Step
                  key={formStep.label}
                  onClick={handleStepButtonClick(
                    index,
                    steps[activeStep].getRequestPayload
                  )}
                >
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
                    onClick={() => {
                      void handleSave()
                    }}
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
  )
}
