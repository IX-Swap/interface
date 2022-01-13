import React from 'react'
import { Grid, Link, TextField, Typography } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { SignupArgs } from 'types/auth'
import { PasswordField } from 'components/form/PasswordField'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'
import { useStyles } from 'auth/pages/register/Register.styles'

const CheckboxLabel = () => {
  const { label, link } = useStyles()

  return (
    <Typography component='span' variant='body2' className={label}>
      I have read and agree to the{' '}
      <Link
        href='https://investax.io/terms-of-use/'
        target='_blank'
        className={link}
      >
        {' '}
        Terms &amp; Conditions
      </Link>
      ,{' '}
      <Link
        href='https://investax.io/privacy/'
        target='_blank'
        className={link}
      >
        Privacy Policy
      </Link>{' '}
      and{' '}
      <Link
        href='https://investax.io/disclosure/'
        target='_blank'
        className={link}
      >
        Regulatory Disclosures
      </Link>
    </Typography>
  )
}

export const RegisterFields = () => {
  const { control } = useFormContext<SignupArgs>()

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <TypedField
          control={control}
          component={TextField}
          name='name'
          label='Full Name'
          fullWidth
        />
      </Grid>
      <Grid item>
        <TypedField
          control={control}
          component={TextField}
          name='email'
          label='Email'
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
