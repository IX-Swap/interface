import { Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { ComponentType, useRef } from 'react'
import { useStyles } from '../FormStepper/FormStepper.styles'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { MutationResultPair } from 'react-query'
import { DSOFormStep } from './DSOFormStep'
import { DSOFormContextWrapper } from './DSOFormContext'

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
  formTitle: string
  submitText: string
  isRequiredOnLastStep?: boolean
  isNew: boolean
  isLive?: boolean
  skippable?: boolean
  redirectFunction: (isCreate: boolean, dsoId: string) => string
  rawData: any
  numRef: any
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
    redirectFunction,
    rawData
  } = props

  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const { getFilterValue, updateFilter } = useQueryFilter()
  const stepFilter = getFilterValue('step')

  const handleStepButtonClick =
    (step: number, save: any, transformData: any) => () => {
      if (nonLinear) {
        setCompleted([...completed, activeStep])
        setActiveStep(step)
        // const values = watch()

        const payload = transformData({})
        save(
          { ...payload },
          {
            onSettled: (data: any) => {}
          }
        )
        return
      }

      if (completed.includes(step) || step === Math.max(...completed) + 1) {
        setActiveStep(step)
      }
    }

  const handleComplete = () => {
    if (!completed.includes(activeStep)) {
      const tempComplete = new Set([...completed, activeStep])
      setCompleted(Array.from(tempComplete))
    }
  }

  const handleCreateComplete = () => {
    if (!createCompleted.includes(activeStep)) {
      const tempComplete = new Set([...createCompleted, activeStep])
      setCreateCompleted(Array.from(tempComplete))
    }
  }

  const removeComplete = (index: number, completed: any) => {
    if (completed.includes(index) as boolean) {
      const tempComplete = new Set([...completed])
      tempComplete.delete(index)
      setCompleted(Array.from(tempComplete))
    }
  }

  const removeCreateComplete = (index: number, completed: any) => {
    if (createCompleted.includes(index)) {
      const tempComplete = new Set([...createCompleted])
      tempComplete.delete(index)
      setCreateCompleted(Array.from(tempComplete))
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

  const [createCompleted, setCreateCompleted] = React.useState<number[]>(
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
  const setMainConditions = () => {}
  const mainConditions = useRef({})
  return (
    <Grid>
      <DSOFormContextWrapper>
        {steps.map((step: any, index: number) => (
          <>
            <DSOFormStep
              mainConditions={mainConditions}
              setMainConditions={setMainConditions}
              removeComplete={removeComplete}
              removeCreateComplete={removeCreateComplete}
              setCreateComplete={handleCreateComplete}
              createComplete={createCompleted}
              rawData={rawData}
              key={`step-content-${index}`}
              step={step}
              stepsList={steps}
              index={index}
              totalSteps={steps.length}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              setCompleted={handleComplete}
              data={data}
              createMutation={createMutation}
              editMutation={editMutation}
              submitMutation={submitMutation}
              skippable={skippable}
              completed={completed}
              isRequiredOnLastStep={isRequiredOnLastStep}
              isNew={isNew}
              redirectFunction={redirectFunction}
              nonLinear={nonLinear}
              matches={matches}
              formTitle={formTitle}
              submitText={submitText}
              getStepStatus={getStepStatus}
              handleStepButtonClick={handleStepButtonClick}
              contentClassName={classes.content}
            />
          </>
        ))}
      </DSOFormContextWrapper>
    </Grid>
  )
}
