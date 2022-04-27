import React from 'react'
import { Box, Button, Step, useMediaQuery } from '@mui/material'
import { Orientation } from '@mui/material/Stepper/Stepper'
import { Stepper } from 'ui/Stepper/Stepper'
import { StepButton } from 'ui/Stepper/StepButton'
import { useTheme } from '@mui/styles'

const steps = [
  'Step Title 1',
  'Step Title 2',
  'Step Title 3',
  'Step Title 4',
  'Step Title 5',
  'Step Title 6'
]

export interface StepperTemplateProps {
  orientation?: Orientation
  formTitle?: string
}

export const StepperExample = ({
  orientation = 'horizontal',
  formTitle
}: StepperTemplateProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const [activeStep, setActiveStep] = React.useState(0)
  const handleStep = (step: number) => () => {
    setActiveStep(step)
  }

  const isStepActive = (index: number) => index === activeStep
  const isStepCompleted = (index: number) => index < activeStep
  const isStepFailed = (index: number) => index === 2 && index < activeStep

  const getVariantsConditions = (index: number) => ({
    active: isStepActive(index),
    completed: isStepCompleted(index),
    error: isStepFailed(index)
  })

  return (
    <Stepper
      nonLinear
      orientation={orientation}
      activeStep={activeStep}
      stepInfo={
        orientation === 'horizontal' && matches
          ? {
              label: steps[activeStep],
              activeStep: activeStep + 1,
              totalSteps: steps.length
            }
          : undefined
      }
      title={formTitle}
      actions={
        <Box
          display='flex'
          justifyContent={matches ? 'center' : 'flex-start'}
          width='100%'
          mt={matches ? 1 : 3}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: {
                xs: 300,
                md: 220
              }
            }}
          >
            <Button fullWidth variant='outlined'>
              Save Draft
            </Button>
          </Box>
        </Box>
      }
    >
      {steps.map((label, index) => {
        const step = index + 1

        return (
          <Step key={label} completed={getVariantsConditions(index).completed}>
            <StepButton
              step={step}
              variantsConditions={getVariantsConditions(index)}
              onClick={handleStep(index)}
            >
              {label}
            </StepButton>
          </Step>
        )
      })}
    </Stepper>
  )
}
