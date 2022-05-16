import { Box, Typography } from '@mui/material'
import React from 'react'

export interface FormSectionHeaderProps {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  variant?: 'section' | 'subsection'
}

export const FormSectionHeader = ({
  title,
  subtitle,
  variant = 'section'
}: FormSectionHeaderProps) => {
  return (
    <Box my={variant === 'section' ? 3 : 2}>
      <Typography variant={variant === 'section' ? 'h5' : 'subtitle1'}>
        {title}
      </Typography>

      {subtitle !== undefined ? (
        <Box mt={1}>
          <Typography fontWeight={400} variant='body1' color='textSecondary'>
            {subtitle}
          </Typography>
        </Box>
      ) : null}
    </Box>
  )
}
