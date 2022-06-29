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
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { SingPass } from 'auth/pages/register/components/SingPass/SingPass'
import { EmailField } from 'auth/pages/register/components/EmailField'
import { PhoneField } from 'auth/pages/register/components/PhoneField'

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

export interface RegisterFieldsProps {
  isMyInfo?: boolean
}

export const RegisterFields = ({ isMyInfo = false }: RegisterFieldsProps) => {
  const { getFilterValue } = useQueryFilter()
  const identity = getFilterValue('identityType')
  const isIndividual = identity === 'individual'

  const { control, errors } = useFormContext<SignupArgs>()
  const { bottomBlock, topBlock } = useStyles({})
  const nameErrors = errors.name
  const agreeErrors = errors.agree

  return (
    <Grid container spacing={6} direction='column'>
      <Grid item>{isIndividual ? isMyInfo ? null : <SingPass /> : null}</Grid>
      {!isMyInfo ? (
        <Grid item>
          <TypedField
            control={control}
            component={TextField}
            name='name'
            label={isIndividual ? 'Full Name' : 'Corporate Name'}
            placeholder={isIndividual ? 'Full Name' : 'Corporate Name'}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              endAdornment:
                nameErrors !== undefined ? (
                  <InputAdornment position='end'>
                    <WarningIcon />
                  </InputAdornment>
                ) : null
            }}
          />
        </Grid>
      ) : null}

      <Grid item>
        <EmailField isMyInfo={isMyInfo} />
      </Grid>

      {isMyInfo ? (
        <Grid item>
          <PhoneField isMyInfo={isMyInfo} />
        </Grid>
      ) : null}

      <Grid item className={topBlock}>
        <PasswordField
          isMyInfo={isMyInfo}
          withPasswordValidation
          showErrorMessages={false}
        />
      </Grid>
      {!isMyInfo ? (
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
      ) : null}
    </Grid>
  )
}
