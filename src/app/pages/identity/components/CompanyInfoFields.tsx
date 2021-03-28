import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { DataroomUploader } from 'components/dataroom/DataroomUploader'
import { DataroomAvatarUploader } from 'components/dataroom/DataroomAvatarUploader'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { CountrySelect } from 'components/form/CountrySelect'
import { DataroomFileType } from 'config/dataroom'
import { privateClassNames } from 'helpers/classnames'
import { CorporateIdentity } from 'app/pages/_identity/types/forms'

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
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          component={Input}
          control={control}
          name='companyLegalName'
          label='Company Name'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          className={privateClassNames()}
          component={Input}
          control={control}
          name='registrationNumber'
          label='Company Registration Number'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          component={CountrySelect}
          control={control}
          name='countryOfFormation'
          label='Country of Formation'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          component={Input}
          control={control}
          name='email'
          label='Email Address'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
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
