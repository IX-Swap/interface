import React from 'react'
import { Button, Grid } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { OTPField } from 'components/form/OTPField'
import { useFormContext } from 'react-hook-form'
import { Submit } from 'components/form/Submit'
import { plainValueExtractor } from 'helpers/forms'

export interface OTPFieldsProps {
  isLoading: boolean
  onClose: () => void
  placeholder?: string
}

export const OTPFields = ({
  isLoading,
  onClose,
  placeholder
}: OTPFieldsProps) => {
  const { control, watch } = useFormContext()
  const isOTPFull = watch('otp').length === 6

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <TypedField
          control={control}
          customRenderer
          component={OTPField}
          name='otp'
          label=''
          isInputNum={true}
          variant='outlined'
          valueExtractor={plainValueExtractor}
          shouldAutoFocus
          placeholder={placeholder}
        />
      </Grid>
      <Grid item container justifyContent='center' spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            size='large'
            variant='outlined'
            color='primary'
            onClick={onClose}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Submit
            fullWidth
            size='large'
            variant='contained'
            color='primary'
            disabled={isLoading || !isOTPFull}
          >
            Confirm
          </Submit>
        </Grid>
      </Grid>
    </Grid>
  )
}
