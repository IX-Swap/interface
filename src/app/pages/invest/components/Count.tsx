import React from 'react'
import { Typography } from '@mui/material'

export interface CountProps {
  value: string | number
}

export const Count = ({ value }: CountProps) => {
  return (
    <Typography
      display={'inline'}
      sx={theme => ({
        backgroundColor: '#4c88ff10',
        color: theme.palette.info.main,
        borderRadius: 16,
        marginLeft: 1.5,
        px: 1,
        py: 0.5
      })}
    >
      {value ?? 0}
    </Typography>
  )
}
