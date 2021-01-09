import React from 'react'
import { Box, Typography } from '@material-ui/core'

export interface FormSectionHeaderProps {
  title: string
}

export const FormSectionHeader = ({ title }: FormSectionHeaderProps) => {
  return (
    <Box pb={0.5} borderBottom={`1px solid #EDEDED`} mb={3}>
      <Typography variant='h2'>{title}</Typography>
    </Box>
  )
}
