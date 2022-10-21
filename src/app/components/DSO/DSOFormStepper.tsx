import { Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { ComponentType } from 'react'
import { useStyles } from '../FormStepper/FormStepper.styles'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { MutationResultPair } from 'react-query'
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
  formTitle: string
  submitText: string
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
  const { getFilterValue, updateFilter } = useQueryFilter()
  const stepFilter = getFilterValue('step')
  // const { watch } = useFormContext()
  // const history = useHistory()

  // const [save] = mutation;

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
            onSettled: (data: any) => {
              console.log(data)
            }
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
    <Grid>
      {steps.map((step: any, index: number) => (
        <DSOFormStep
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
      ))}
    </Grid>
  )
}
