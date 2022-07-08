import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'
import React from 'react'

export interface StepInfoProps {
  label?: string
  activeStep?: number
  totalSteps?: number
}

export const StepInfo = ({ label, activeStep, totalSteps }: StepInfoProps) => {
  const theme = useTheme()
  return (
    <Box display='flex' justifyContent='space-between' mb={1}>
      <Typography
        variant='overline'
        color={theme.palette.stepIcon.color}
        fontSize={14}
        textTransform='capitalize'
      >
        {label}
      </Typography>
      {activeStep !== undefined && totalSteps !== undefined && (
        <Typography
          variant='overline'
          color={theme.palette.stepIcon.color}
          fontSize={14}
          textTransform='capitalize'
        >
          Step {activeStep < totalSteps ? activeStep : totalSteps}/{totalSteps}
        </Typography>
      )}
    </Box>
  )
}
