import { Box, FormControl } from '@mui/material'
import { useStyles } from 'components/form/MinimumInvestmentField.styles'
import { NumericInput, NumericInputProps } from 'components/form/NumericInput'
import React from 'react'

export const NumericFieldCapsule = (props: NumericInputProps) => {
  const { fieldContainer } = useStyles()

  return (
    <Box className={fieldContainer}>
      <FormControl fullWidth>
        <NumericInput {...props} />
      </FormControl>
    </Box>
  )
}

NumericFieldCapsule.displayName = 'TextInput_NumericFieldCapsule'
