import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { OTPField } from 'components/form/OTPField'
import { useFormContext } from 'react-hook-form'
import { plainValueExtractor } from 'helpers/forms'
import { Box } from '@material-ui/core'
import { Submit } from 'components/form/Submit'

export const EnableFormFields = () => {
  const { control, watch } = useFormContext()
  const otp = watch('otp')
  const isSubmitDisabled = otp.length < 6

  return (
    <>
      <TypedField
        control={control}
        customRenderer
        component={OTPField}
        name='otp'
        label=''
        variant='standard'
        valueExtractor={plainValueExtractor}
        shouldAutoFocus
      />
      <Box my={4} width='100%' textAlign='center'>
        <Submit disabled={isSubmitDisabled}>Enable</Submit>
      </Box>
    </>
  )
}
