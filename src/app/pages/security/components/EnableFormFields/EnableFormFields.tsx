import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { plainValueExtractor } from 'helpers/forms'
import { Box } from '@mui/material'
import { Submit } from 'components/form/Submit'
import { OTPInputField } from 'ui/OTPInputField/OTPInputField'
import { useStyles } from './EnableFormFields.styles'

export const EnableFormFields = () => {
  const { control, watch } = useFormContext()
  const otp = watch('otp')
  const isSubmitDisabled = otp.length < 6
  const classes = useStyles()

  return (
    <>
      <TypedField
        isInputNum
        control={control}
        component={OTPInputField}
        name='otp'
        variant='outlined'
        valueExtractor={plainValueExtractor}
        numInputs={6}
        shouldAutoFocus
      />
      <Box width='100%' textAlign='center'>
        <Submit disabled={isSubmitDisabled} className={classes.button}>
          Enable and Continue
        </Submit>
      </Box>
    </>
  )
}
