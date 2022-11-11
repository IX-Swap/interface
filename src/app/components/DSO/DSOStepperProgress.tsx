import React from 'react'
import { useStyles } from '../FormStepper/FormStepper.styles'
import { Stepper } from 'ui/Stepper/Stepper'
import { Grid, Paper, Step } from '@mui/material'
import { TwoFANotice } from '../FormStepper/TwoFANotice'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { SaveDraftButton } from './DSODraftButton'
import { DSOStepperStep } from './DSOFormStepper'
import { MutateFunction, MutationResultPair } from 'react-query'
import { useFormContext } from 'react-hook-form'
import { useDSOFormContext } from './DSOFormContext'
import _, { isEmpty } from 'lodash'
import { SubmitButton } from '../FormStepper/SubmitButton'
import { generatePath, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { getIdFromObj } from 'helpers/strings'
import { StepButton } from 'ui/Stepper/StepButton'
import { dsoFormBaseValidationSchema } from 'validation/dso'
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

export const getSubmitDSOPayload = (data: any) => {
  const teams = _.isEmpty(data.teams) ? null : data.teams
  return {
    ...data,
    teams
  }
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
  const { watch, errors, trigger } = useFormContext()
  const values = watch()
  const payload = transformData(values)
  const { stepValues, setStepValues } = useDSOFormContext()
  const { dsoId, issuerId } = useParams()
  const history = useHistory()

  const handleSave = async (index: number) => {
    // eslint-disable-next-line
    const newValues = [...stepValues]
    await trigger()
    await trigger('documents')
    newValues[activeStep] = { values, errors: { ...errors } }
    setStepValues(newValues)
    const obj = errors

    if (!isEmpty(obj)) {
      const search: string = `?step=${steps[index].label.replace(' ', '+')}`
      if (dsoId !== undefined && issuerId !== undefined) {
        const redirect: string = redirectFunction(dsoId)
        history.replace(
          generatePath(`${redirect}${search}`, {
            issuerId,
            dsoId
          })
        )
      } else {
        /* eslint-disable no-restricted-globals */
        history.replace(generatePath(`${location?.pathname}${search}`))
      }
    } else {
      return await save(
        {
          ...payload
        },
        {
          onSettled: (data: any) => {
            if (data !== undefined) {
              const redirect: string = redirectFunction(data.data._id)
              const newActiveStep = index
              const search: string = `?step=${steps[
                newActiveStep
              ].label.replace(' ', '+')}`

              history.replace(
                generatePath(`${redirect}${search}`, {
                  issuerId:
                    typeof data.data.user === 'string'
                      ? data.data.user
                      : getIdFromObj(data.data.user),
                  dsoId: data.data._id
                })
              )
            }
          }
        }
      )
    }
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
                <Grid item xs={12}>
                  <SubmitButton
                    mutation={submitMutation}
                    data={getSubmitDSOPayload(data)}
                    customSchema={dsoFormBaseValidationSchema}
                    step={steps[steps.length - 1]}
                    fullWidth
                    size='medium'
                    submitText={submitText}
                  />
                </Grid>
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
                    steps={steps}
                    activeStep={activeStep}
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
                    index={index}
                    data={data}
                    stepData={{
                      step: steps[index],
                      formData: stepValues,
                      isLast: index === steps.length - 1,
                      shouldValidate: completed.includes(index)
                    }}
                    onClick={() => {
                      void handleSave(index)
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
