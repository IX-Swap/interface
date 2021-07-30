import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { OTPField } from 'components/form/OTPField'
import { useFormContext } from 'react-hook-form'
import { Submit } from 'components/form/Submit'
import { plainValueExtractor } from 'helpers/forms'

export interface OTPFieldsProps {
  isLoading: boolean
  onClose: () => void
}

export const OTPFields = ({ isLoading, onClose }: OTPFieldsProps) => {
  const { control } = useFormContext()

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <TypedField
          control={control}
          customRenderer
          component={OTPField}
          name='otp'
          label=''
          variant='outlined'
          valueExtractor={plainValueExtractor}
          shouldAutoFocus
        />
      </Grid>
      <Grid item container justify='flex-end' spacing={2}>
        <Grid item>
          <Button
            size='large'
            variant='outlined'
            color='primary'
            onClick={onClose}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Submit
            size='large'
            variant='contained'
            color='primary'
            disabled={isLoading}
          >
            Confirm
          </Submit>
        </Grid>
      </Grid>
    </Grid>
  )
}
