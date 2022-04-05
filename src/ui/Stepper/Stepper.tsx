import React from 'react'
import {
  Stepper as MuiStepper,
  StepperProps as MuiStepperProps
} from '@mui/material'

export interface StepperProps extends MuiStepperProps {}

export const Stepper = ({
  children,
  alternativeLabel,
  ...props
}: StepperProps) => {
  return (
    <MuiStepper
      {...props}
      alternativeLabel={props.orientation === 'horizontal'}
      connector={null}
    >
      {children}
    </MuiStepper>
  )
}
