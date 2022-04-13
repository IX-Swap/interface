import React from 'react'
import { Box, Typography } from '@mui/material'
import { useStyles } from 'ui/Stepper/StepIcon/StepIcon.styles'
import { ReactComponent as CompletedIcon } from 'assets/icons/completed-icon.svg'

export type StepIconType = 'completed' | 'active' | 'default' | 'error'

export interface StepIconProps {
  step: number
  type: StepIconType
}

export const StepIcon = ({ step, type }: StepIconProps) => {
  const classes = useStyles({ type })

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.text}>
        {type === 'completed' ? <CompletedIcon /> : step}
      </Typography>
    </Box>
  )
}
