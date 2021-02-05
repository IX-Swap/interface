import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from 'app/components/DSO/components/FormSectionHeader.styles'

export interface FormSectionHeaderProps {
  title: string
}

export const FormSectionHeader = ({ title }: FormSectionHeaderProps) => {
  const { formHeader } = useStyles()

  return (
    <Box className={formHeader} pb={0.5} mb={3}>
      <Typography variant='h3'>{title}</Typography>
    </Box>
  )
}
