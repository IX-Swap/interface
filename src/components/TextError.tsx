import React from 'react'
import { FormErrorRendererProps } from 'components/form/FormError'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export interface TextErrorProps extends FormErrorRendererProps {}

export const TextError = (props: TextErrorProps) => {
  const { error } = props
  const theme = useTheme()

  if (error === undefined) {
    return null
  }

  return (
    <Typography
      color='error'
      style={{ marginLeft: theme.spacing(1), marginRight: theme.spacing(1) }}
    >
      {error.message}
    </Typography>
  )
}
