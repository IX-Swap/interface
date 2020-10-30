import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { CorporateIdentity } from 'v2/types/identity'
import { TypedField } from 'v2/components/form/TypedField'
import { DataroomUploader } from 'v2/components/dataroom/DataroomUploader'
import { DataroomAvatarUploader } from 'v2/components/dataroom/DataroomAvatarUploader'
import { documentValueExtractor } from 'v2/app/components/DSO/utils'
import { DatePicker } from 'v2/components/form/DatePicker'
import { CountrySelect } from 'v2/components/form/CountrySelect'
import { dateTimeValueExtractor } from 'v2/helpers/forms'

export const CompanyInfoFields = () => {
  const { control } = useFormContext<CorporateIdentity>()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* @ts-ignore */}
        <TypedField
          customRenderer
          component={DataroomUploader}
          render={DataroomAvatarUploader}
          control={control}
          name='logo'
          label='Company Logo'
          valueExtractor={documentValueExtractor}
          documentInfo={{
            type: 'Company Logo',
            title: 'Company Logo'
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          component={Input}
          control={control}
          name='companyLegalName'
          label='Company Name'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          component={Input}
          control={control}
          name='registrationNumber'
          label='Company Registration Number'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          component={CountrySelect}
          control={control}
          name='countryOfFormation'
          label='Country of Formation'
        />
      </Grid>
      <Grid item xs={4}>
        {/* @ts-ignore */}
        <TypedField
          component={DatePicker}
          customRenderer
          valueExtractor={dateTimeValueExtractor}
          control={control}
          name='dateOfIncorporation'
          label='Date of Incorporation'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          component={Input}
          control={control}
          name='email'
          label='Email Address'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          component={Input}
          control={control}
          name='contactNumber'
          label='Contact Number'
        />
      </Grid>
    </Grid>
  )
}
