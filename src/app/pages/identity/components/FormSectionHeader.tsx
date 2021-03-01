import { Box, Divider, Typography } from '@material-ui/core'
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
    <Box mb={3}>
      <Typography variant={variant === 'section' ? 'h5' : 'subtitle1'}>
        {title}
      </Typography>
      <Box m={1} />
      <Divider />
      <Typography variant='subtitle2' color='textSecondary'>
        {subtitle}
      </Typography>
    </Box>
  )
}
