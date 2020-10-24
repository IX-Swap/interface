import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { CorporateIdentity } from 'v2/types/identity'
import { EditableField } from 'v2/components/form/EditableField'
import { NewDataroomUploader } from 'v2/components/form/NewDataroomUploader'
import { DataroomAvatar } from 'v2/components/form/DataroomAvatar'
import { documentValueExtractor } from 'v2/app/components/DSO/utils'
import { Checkbox } from 'v2/components/form/Checkbox'
import { DatePicker } from 'v2/components/form/DatePicker'
import { CountrySelect } from 'v2/components/form/CountrySelect'
import {
  booleanValueExtractor,
  dateTimeValueExtractor
} from 'v2/components/form/createTypedForm'

export const CompanyInfo = (): JSX.Element => {
  const { control } = useFormContext<CorporateIdentity>() // TODO: update type

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* @ts-ignore */}
        <EditableField
          component={NewDataroomUploader}
          control={control}
          name='logo'
          label='Company Logo'
          render={DataroomAvatar}
          valueExtractor={documentValueExtractor}
          documentInfo={{
            type: 'Company Logo',
            title: 'Company Logo'
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          component={Input}
          control={control}
          name='companyLegalName'
          label='Company Name'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          component={Input}
          control={control}
          name='registrationNumber'
          label='Company Registration Number'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          component={CountrySelect}
          control={control}
          name='countryOfFormation'
          label='Country of Formation'
        />
      </Grid>
      <Grid item xs={4}>
        {/* @ts-ignore */}
        <EditableField
          component={DatePicker}
          valueExtractor={dateTimeValueExtractor}
          control={control}
          name='dateOfIncorporation'
          label='Date of Incorporation'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          component={Input}
          control={control}
          name='walletAddress'
          label='Digital Security Wallet Address'
        />
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <EditableField
          component={Input}
          control={control}
          name='email'
          label='Email Address'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          component={Input}
          control={control}
          name='contactNumber'
          label='Contact Number'
        />
      </Grid>
      <Grid item xs={5}>
        <EditableField
          customRenderer={Checkbox}
          valueExtractor={booleanValueExtractor}
          control={control}
          name='toArrangeCustody'
          label='I would like InvestaX to arrange digital security custody'
        />
      </Grid>
    </Grid>
  )
}
