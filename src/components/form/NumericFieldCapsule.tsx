import React from 'react'
import { Box, FormControl, Typography } from '@mui/material'
import { NumericInput, NumericInputProps } from 'components/form/NumericInput'
import { useStyles } from 'components/form/MinimumInvestmentField.styles'

export interface NumericFieldCapsuleProps extends NumericInputProps {
  capsuleLabel?: string
}

export const NumericFieldCapsule = (props: NumericFieldCapsuleProps) => {
  const { capsule, fieldContainer } = useStyles()
  return (
    <Box className={fieldContainer}>
      {props.capsuleLabel !== null && props.capsuleLabel !== '' ? (
        <Box className={capsule}>
          <Typography variant='subtitle1' color='textSecondary'>
            {props.capsuleLabel}
          </Typography>
        </Box>
      ) : null}

      <FormControl fullWidth>
        <NumericInput {...props} />
      </FormControl>
    </Box>
  )
}
