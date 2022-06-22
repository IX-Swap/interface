import React from 'react'
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
  ...props
}: StepButtonProps) => {
  const cn = Object.keys(variantsConditions).filter((key: string) => {
    return variantsConditions[key as keyof VariantsConditions]
  })

  return (
    <MuiStepButton
      {...props}
      icon={<StepIcon step={step} type={getIconType(variantsConditions)} />}
      className={cn.join(' ')}
    >
      <StepLabel error={variantsConditions.error}>{children}</StepLabel>
    </MuiStepButton>
  )
}
