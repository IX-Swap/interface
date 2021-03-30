import { Grid, TextField, Typography } from '@material-ui/core'
import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const IssuerDetails = () => {
  const { control } = useFormContext()

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h5'>Basic Information</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TypedField
              component={TextField}
              control={control}
              name='fullName'
              label='Full Name'
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TypedField
              component={TextField}
              control={control}
              name='companyName'
              label='Company Name'
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TypedField
              component={TextField}
              control={control}
              name='companyRegistrationNumber'
              label='Registration Number / UEN'
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TypedField
              component={TextField}
              control={control}
              name='contactNumber'
              label='Contact Number - (optional)'
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TypedField
              component={TextField}
              control={control}
              name='email'
              label='Email Address'
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TypedField
              component={TextField}
              control={control}
              name='industry'
              label='Industry'
              variant='outlined'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h5'>Fundraising Information</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TypedField
              component={NumericInput}
              control={control}
              numberFormat={moneyNumberFormat}
              valueExtractor={numericValueExtractor}
              name='fundRaisingAmount'
              label='Fundraising Amount'
              variant='outlined'
              helperText='Amount in SGD'
            />
          </Grid>
          <Grid item xs={12}>
            <TypedField
              component={TextField}
              label='Details of Issuance'
              name='detail'
              control={control}
              multiline
              fullWidth
              variant='outlined'
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
