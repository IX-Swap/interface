import { Grid, TextField, Typography } from '@material-ui/core'
import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useIndividualDefaultInfo } from 'hooks/auth/useIndividualDefaultInfo'

export const basicInformationFields = [
  {
    name: 'fullName',
    label: 'Full Name'
  },
  { name: 'companyName', label: 'Company Name' },
  { name: 'companyRegistrationNumber', label: 'Registration Number / UEN' },
  { name: 'contactNumber', label: 'Contact Number - (optional)' },
  { name: 'email', label: 'Email Address' },
  { name: 'industry', label: 'Industry' }
]

export interface IssuerDetailFieldsProps {
  rootName?: string
}

export const IssuerDetails = (props: IssuerDetailFieldsProps) => {
  const { rootName } = props
  const { control } = useFormContext()
  const {
    firstName: defaultFirstName,
    lastName: defaultLastName,
    middleName: defaultMiddleName
  } = useIndividualDefaultInfo(rootName)

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h5'>Basic Information</Typography>
          </Grid>
          {basicInformationFields.map(field => (
            <Grid item xs={12} sm={6}>
              <TypedField
                component={TextField}
                control={control}
                name={field.name}
                label={field.label}
                variant='outlined'
                defaultValue={
                  field.name === 'fullName'
                    ? `${defaultFirstName as string}
                        ${defaultMiddleName as string}
                       ${defaultLastName as string}`.replace(/\s\s+/g, ' ')
                    : ''
                }
              />
            </Grid>
          ))}
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
