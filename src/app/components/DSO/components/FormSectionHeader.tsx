import React from 'react'
import { Box, Typography } from '@mui/material'
import { useStyles } from 'app/components/DSO/components/FormSectionHeader.styles'
import { Variant } from '@mui/material/styles/createTypography'

export interface FormSectionHeaderProps {
  title: string
  variant?: Variant
  hasBorderBottom?: boolean
}

export const FormSectionHeader = ({
  title,
  variant = 'h3',
  hasBorderBottom = true
}: FormSectionHeaderProps) => {
  const { formHeader } = useStyles()

  return (
    <Box className={hasBorderBottom ? formHeader : undefined} pb={0.5} mb={3}>
      <Typography variant={variant}>{title}</Typography>
    </Box>
  )
}
