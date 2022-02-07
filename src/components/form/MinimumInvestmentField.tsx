import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, FormControl, Typography } from '@mui/material'
import { NumericInput, NumericInputProps } from 'components/form/NumericInput'
import { useStyles } from 'components/form/MinimumInvestmentField.styles'

export const MinimumInvesmentField = (props: NumericInputProps) => {
  const { watch } = useFormContext()
  const tokenSymbol = watch('tokenSymbol')
  const { capsule, fieldContainer } = useStyles()
  return (
    <Box className={fieldContainer}>
      {tokenSymbol !== null && tokenSymbol !== '' ? (
        <Box className={capsule}>
          <Typography variant='subtitle1' color='textSecondary'>
            {tokenSymbol}
          </Typography>
        </Box>
      ) : null}

      <FormControl fullWidth>
        <NumericInput {...props} />
      </FormControl>
    </Box>
  )
}
