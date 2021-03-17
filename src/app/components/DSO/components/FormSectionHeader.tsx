import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from 'app/components/DSO/components/FormSectionHeader.styles'
import { Variant } from '@material-ui/core/styles/createTypography'

export interface FormSectionHeaderProps {
  title: string
  variant?: Variant
}

export const FormSectionHeader = ({
  title,
  variant = 'h3'
}: FormSectionHeaderProps) => {
  const { formHeader } = useStyles()

  return (
    <Box className={formHeader} pb={0.5} mb={3}>
      <Typography variant={variant}>{title}</Typography>
    </Box>
  )
}
