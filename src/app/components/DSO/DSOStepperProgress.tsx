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
import { generatePath, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { getIdFromObj } from 'helpers/strings'
import { dsoFormBaseValidationSchema } from 'validation/dso'
import { DSOStepButton } from './DSOStepButton'
import { DSOSubmitButton } from './DSOSubmitButton'
export interface DSOStepperProgressProps {
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
  rawData: any
  nextCallback: any
  setCompleted: any
  removeComplete: any
  transformData: any
  removeCreateComplete: any
  setCreateComplete: any
  createComplete: any
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
    redirectFunction,
    nextCallback,
    setCompleted,
    removeComplete,
    setCreateComplete,
    createComplete
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
      if (completed.includes(activeStep)) {
        removeComplete(activeStep, completed)
      }
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
              setCompleted()
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
                  <DSOSubmitButton
                    setStepValues={setStepValues}
                    stepValues={stepValues}
                    activeStep={activeStep}
                    removeComplete={removeComplete}
                    mutation={submitMutation}
                    data={getSubmitDSOPayload(data)}
                    customSchema={dsoFormBaseValidationSchema}
                    step={steps[steps.length - 1]}
                    fullWidth
                    size='medium'
                    submitText={submitText}
                    completed={completed}
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
                    setCompleted={setCompleted}
                    removeComplete={removeComplete}
                    completed={completed}
                    setCreateComplete={setCreateComplete}
                  />
                </Grid>
              </Grid>
            }
          >
            {steps.map((formStep: any, index: number) => {
              const step = index + 1
              return (
                <Step key={formStep.label}>
                  <DSOStepButton
                    step={step}
                    createComplete={createComplete}
                    variantsConditions={getStepStatus(
                      formStep,
                      index,
                      activeStep
                    )}
                    rawData={data}
                    index={index}
                    data={data}
                    stepData={{
                      step: steps[index],
                      formData: stepValues,
                      isLast: index === steps.length - 1,
                      shouldValidate:
                        dsoId !== undefined
                          ? createComplete.includes(index)
                          : completed.includes(index)
                    }}
                    onClick={() => {
                      void handleSave(index)
                      nextCallback(index)
                      setCreateComplete()
                    }}
                  >
                    {formStep.label}
                  </DSOStepButton>
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
