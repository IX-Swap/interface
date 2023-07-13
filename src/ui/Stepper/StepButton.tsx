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
  index?: number
  data?: any
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

export const StepButton = ({
  variantsConditions,
  step,
  children,
  stepData = {},
  index = undefined,
  data,
  ...props
}: StepButtonProps) => {
  const [validState, setValidState] = useState(false)
  const [validating, setValidating] = useState(true)
  const conditions = {
    ...variantsConditions,
    error: validating ? false : !validState || variantsConditions.error
  }
  const cn = Object.keys(conditions).filter((key: string) => {
    return conditions[key as keyof VariantsConditions]
  })
  const validate = async () => {
    if (stepData.isLast === true) {
      setValidState(true)
      return
    }

    try {
      if (index !== undefined) {
        const schema =
          typeof stepData.step.validationSchema === 'function'
            ? stepData.step.validationSchema(stepData.formData?.[index].values)
            : stepData.step.validationSchema
        setValidating(true)
        setValidState(
          await schema?.isValid(
            stepData.step?.getFormValues(
              stepData.formData[index]?.values ?? data
            )
          )
        )
      } else {
        const schema =
          typeof stepData.step?.validationSchema === 'function'
            ? stepData.step?.validationSchema(stepData.formData)
            : stepData.step?.validationSchema
        setValidating(true)
        setValidState(
          await schema?.isValid(stepData.step?.getFormValues(stepData.formData))
        )
      }
    } catch (error) {
      console.log()
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