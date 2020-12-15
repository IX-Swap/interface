import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { CorporateIdentity } from 'types/identity'
import { TypedField } from 'components/form/TypedField'
import { DataroomUploader } from 'components/dataroom/DataroomUploader'
import { DataroomAvatarUploader } from 'components/dataroom/DataroomAvatarUploader'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { DatePicker } from 'components/form/DatePicker'
import { CountrySelect } from 'components/form/CountrySelect'
import { dateTimeValueExtractor } from 'helpers/forms'
import { DataroomFileType } from 'config/dataroom'
import { privateClassNames } from 'helpers/classnames'

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
          accept={DataroomFileType.image}
          documentInfo={{
            type: 'Company Logo'
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
          className={privateClassNames()}
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
          className={privateClassNames()}
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
          className={privateClassNames()}
          component={Input}
          control={control}
          name='contactNumber'
          label='Contact Number'
        />
      </Grid>
    </Grid>
  )
}
