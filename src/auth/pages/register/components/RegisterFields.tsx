import React from 'react'
import {
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography
} from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { SignupArgs } from 'types/auth'
import { PasswordField } from 'components/form/PasswordField'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'
import { useStyles } from 'auth/pages/register/Register.styles'
import { ReactComponent as WarningIcon } from 'assets/icons/warning.svg'

export interface CheckboxLabelProps {
  isError: boolean
}

const CheckboxLabel = ({ isError }: CheckboxLabelProps) => {
  const { label, link } = useStyles({ isError })

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
  const { control, errors } = useFormContext<SignupArgs>()
  const { bottomBlock, topBlock } = useStyles({})
  const nameErrors = errors.name
  const emailErrors = errors.email
  const agreeErrors = errors.agree

  return (
    <Grid container spacing={6} direction='column'>
      <Grid item>
        <TypedField
          control={control}
          component={TextField}
          name='name'
          label='Full Name'
          placeholder={'Full Name'}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            endAdornment:
              nameErrors !== undefined ? (
                <InputAdornment position={'end'}>
                  <WarningIcon />
                </InputAdornment>
              ) : null
          }}
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
          placeholder={'Email Address'}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            endAdornment:
              emailErrors !== undefined ? (
                <InputAdornment position={'end'}>
                  <WarningIcon />
                </InputAdornment>
              ) : null
          }}
        />
      </Grid>
      <Grid item className={topBlock}>
        <PasswordField withPasswordValidation showErrorMessages={false} />
      </Grid>
      <Grid item className={bottomBlock}>
        <TypedField
          customRenderer
          valueExtractor={booleanValueExtractor}
          component={Checkbox}
          control={control}
          label={(<CheckboxLabel isError={agreeErrors} />) as any}
          name='agree'
          data-testid='agree-to-terms'
        />
      </Grid>
    </Grid>
  )
}
