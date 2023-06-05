import React from 'react'
import { Box, Chip, Typography } from '@mui/material'

export type ColorType =
  | 'initial'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'textPrimary'
  | 'textSecondary'
  | 'error'

export interface BooleanColumnProps {
  value: boolean
  labels?: [string, string]
  colors?: [ColorType, ColorType]
}

export interface TwoFaColumnProps {
  value: boolean
}

export interface VerifierColumnProps {
  value: boolean
}

export const BooleanColumn = ({
  value,
  labels = ['true', 'false'],
  colors = ['textPrimary', 'error']
}: BooleanColumnProps) => {
  return (
    <Typography color={value ? colors[0] : colors[1]}>
      {value ? labels[0] : labels[1]}
    </Typography>
  )
}

export const TwoFaColumn = ({ value }: TwoFaColumnProps) => {
  if (value)
    return (
      <Chip
        label={
          <Box
            sx={{
              minWidth: '140px',
              width: 'auto',
              color: '#6ABC10'
            }}
          >
            Enable
          </Box>
        }
        sx={{
          border: '1px solid #7DD320',
          background: 'rgba(125, 211, 32, 0.2)'
        }}
      />
    )
  else
    return (
      <Chip
        label={
          <Box
            sx={{
              minWidth: '140px',
              width: 'auto',
              color: '#D3A701'
            }}
          >
            Pending
          </Box>
        }
        sx={{
          border: '1px solid #FFC900',
          background: 'rgba(255, 201, 0, 0.2)'
        }}
      />
    )
}

export const VerifierFaColumn = ({ value }: VerifierColumnProps) => {
  if (value)
    return (
      <Chip
        label={
          <Box
            sx={{
              minWidth: '140px',
              width: 'auto',
              color: '#6ABC10'
            }}
          >
            Verified
          </Box>
        }
        sx={{
          border: '1px solid #7DD320',
          background: 'rgba(125, 211, 32, 0.2)'
        }}
      />
    )
  else
    return (
      <Chip
        label={
          <Box
            sx={{
              minWidth: '140px',
              width: 'auto',
              color: '#D3A701'
            }}
          >
            Pending
          </Box>
        }
        sx={{
          border: '1px solid #FFC900',
          background: 'rgba(255, 201, 0, 0.2)'
        }}
      />
    )
}
