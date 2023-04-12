import { Padding } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

export interface FormSectionHeaderReviewProps {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  variant?: 'section' | 'subsection'
}

export const FormSectionHeaderReview = ({
  title,
  variant = 'section'
}: FormSectionHeaderReviewProps) => {
  return (
    <Box>
      <Typography
        style={{ marginBottom: '30px' }}
        variant={variant === 'section' ? 'h5' : 'subtitle1'}
        color={'otpInput.color '}
      >
        {title}
      </Typography>
    </Box>
  )
}
