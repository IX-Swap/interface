import { Box, Typography } from '@mui/material'
import React from 'react'
import { useStyles } from './FormSectionHeader.styles'

export interface FormSectionHeaderProps {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  variant?: 'section' | 'subsection'
  hasBottomBorder?: boolean
}

export const FormSectionHeader = ({
  title,
  subtitle,
  variant = 'section',
  hasBottomBorder = false
}: FormSectionHeaderProps) => {
  const { formHeader } = useStyles()
  return (
    <Box className={hasBottomBorder ? formHeader : undefined}>
      <Typography
        variant={variant === 'section' ? 'h5' : 'subtitle1'}
        color={'otpInput.color '}
      >
        {title}
      </Typography>

      {subtitle !== undefined ? (
        <Box m={1}>
          <Typography fontWeight={400} variant='body1' color='textSecondary'>
            {subtitle}
          </Typography>
        </Box>
      ) : null}
    </Box>
  )
}
