import React from 'react'
import { Grid, Link, TextField, Typography } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { SignupArgs } from 'types/auth'
import { PasswordField } from 'components/form/PasswordField'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'

const CheckboxLabel = () => (
  <Typography component='span' variant='body2'>
    I have read and agree to the{' '}
    <Link href='https://investax.io/terms-of-use/' target='_blank'>
      {' '}
      Terms &amp; Conditions
    </Link>
    ,{' '}
    <Link href='https://investax.io/privacy/' target='_blank'>
      Privacy Policy
    </Link>{' '}
    and{' '}
    <Link href='https://investax.io/disclosure/' target='_blank'>
      Regulatory Disclosures
    </Link>
  </Typography>
)

export const RegisterFields = () => {
  const { control } = useFormContext<SignupArgs>()

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <TypedField
          control={control}
          customRenderer
          component={TextField}
          variant='outlined'
          name='name'
          label='Full Name'
          fullWidth
        />
      </Grid>
      <Grid item>
        <TypedField
          customRenderer
          control={control}
          component={TextField}
          variant='outlined'
          name='email'
          label='Email Address'
          type='email'
          fullWidth
        />
      </Grid>
      <Grid item>
        <PasswordField showErrors />
      </Grid>
      <Grid item>
        <TypedField
          customRenderer
          valueExtractor={booleanValueExtractor}
          component={Checkbox}
          control={control}
          label={(<CheckboxLabel />) as any}
          name='agree'
          data-testid='agree-to-terms'
        />
      </Grid>
    </Grid>
  )
}
