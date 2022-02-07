import React from 'react'
import { Box, Typography } from '@mui/material'
import { useStyles } from 'app/pages/issuance/components/DisabledStatus.style'

export interface DisabledStatusProps {
  disabled: boolean
}

export const DisabledStatus = ({ disabled }: DisabledStatusProps) => {
  const { disabledStatus } = useStyles()

  return disabled ? (
    <Box className={disabledStatus}>
      <Typography variant='subtitle2'>Disabled</Typography>
    </Box>
  ) : null
}
