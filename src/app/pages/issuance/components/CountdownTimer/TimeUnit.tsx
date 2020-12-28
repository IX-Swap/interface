import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { addLeadingZeros } from 'helpers/numbers'

export interface TimeUnitProps {
  time: number
  label: string
}

export const TimeUnit: React.FC<TimeUnitProps> = ({
  time,
  label
}: TimeUnitProps) => {
  return (
    <Box>
      <Typography variant='h3' align='center'>
        {addLeadingZeros(time, 2) ?? '00'}
      </Typography>
      <VSpacer size='small' />
      <Box width={60}>
        <Typography align='center' style={{ textTransform: 'uppercase' }}>
          {label}
        </Typography>
      </Box>
    </Box>
  )
}
