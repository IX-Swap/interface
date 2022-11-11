import React, { useEffect, useState } from 'react'
import {
  StepButton as MuiStepButton,
  StepButtonProps as MuiStepButtonProps,
  StepLabel
} from '@mui/material'
import { StepIcon } from 'ui/Stepper/StepIcon/StepIcon'

export interface VariantsConditions {
  active: boolean
  completed: boolean
  error: boolean
}

export interface StepButtonProps extends MuiStepButtonProps {
  step: number
  variantsConditions: VariantsConditions
  stepData?: any
  index: number
  data?: any
  rawData: any
  createComplete: any
}

export interface SchemaDataProps {
  data: any
}

const getIconType = ({ active, completed, error }: VariantsConditions) => {
  if (active) {
    return 'active'
  }

  if (error) {
    return 'error'
  }

  if (completed) {
    return 'completed'
  }

  return 'default'
}

export const DSOStepButton = ({
  variantsConditions,
  step,
  children,
  stepData = {},
  index,
  data,
  rawData,
  createComplete,
  ...props
}: StepButtonProps) => {
  const [validState, setValidState] = useState(false)
  const [validating, setValidating] = useState(true)
  const conditions = {
    ...variantsConditions,
    // completed: dsoId ? variantsConditions.completed : variantsConditions.completed && validState,
    error: validating ? false : !validState || variantsConditions.error
  }
  const cn = Object.keys(conditions).filter((key: string) => {
    return conditions[key as keyof VariantsConditions]
  })

  const validate = async () => {
    try {
      const schema =
        typeof stepData.step.validationSchema === 'function'
          ? stepData.step.validationSchema(
              stepData.formData?.[index]?.values !== undefined
                ? stepData.formData?.[index]?.values
                : rawData
            )
          : stepData.step.validationSchema
      setValidating(true)
      setValidState(
        await schema?.isValid(
          stepData.step?.getFormValues(
            stepData.formData[index]?.values !== undefined
              ? stepData.formData[index]?.values
              : rawData
          )
        )
      )
    } catch (error) {
      console.log(error)
    } finally {
      setValidating(false)
    }
  }

  useEffect(() => {
    stepData.shouldValidate === true && validate()
  }, [stepData.formData, stepData.shouldValidate]) //eslint-disable-line

  return (
    <MuiStepButton
      {...props}
      icon={<StepIcon step={step} type={getIconType(conditions)} />}
      className={cn.join(' ')}
    >
      <StepLabel error={conditions.error}>{children}</StepLabel>
    </MuiStepButton>
  )
}
