import React from 'react'
import { IdentityProfile } from 'v2/types/identity'
import { Grid, Input } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { EditableField } from 'v2/components/form/EditableField'
import { NewDataroomUploader } from 'v2/components/form/NewDataroomUploader'
import { DataroomAvatar } from 'v2/components/form/DataroomAvatar'
import { documentValueExtractor } from 'v2/app/components/DSO/utils'
import { DatePicker } from 'v2/components/form/DatePicker'
import { dateTimeValueExtractor } from 'v2/components/form/createTypedForm'
import { NationalitySelect } from 'v2/components/form/NationalitySelect'
import { CountrySelect } from 'v2/components/form/CountrySelect'
import { GenderSelect } from 'v2/components/form/GenderSelect'
import { MartialStatusSelect } from 'v2/components/form/MartialStatusSelect'

export interface PersonalInfoFieldsProps {
  rootName?: string
}

export const PersonalInfoFields = (
  props: PersonalInfoFieldsProps
): JSX.Element => {
  const { rootName } = props
  const { control } = useFormContext<IdentityProfile>()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* @ts-ignore */}
        <EditableField
          component={NewDataroomUploader}
          control={control}
          rootName={rootName}
          name='photo'
          label='Photo'
          render={DataroomAvatar}
          valueExtractor={documentValueExtractor}
          documentInfo={{
            type: 'User Photo',
            title: 'User Photo'
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          rootName={rootName}
          component={Input}
          control={control}
          name='firstName'
          label='First Name'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          rootName={rootName}
          component={Input}
          control={control}
          name='middleName'
          label='Middle Name'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          rootName={rootName}
          component={Input}
          control={control}
          name='lastName'
          label='Last Name'
        />
      </Grid>
      <Grid item xs={4}>
        {/* @ts-ignore */}
        <EditableField
          rootName={rootName}
          control={control}
          name='dob'
          label='Date of Birth'
          component={DatePicker}
          valueExtractor={dateTimeValueExtractor}
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          rootName={rootName}
          component={NationalitySelect}
          control={control}
          name='nationality'
          label='Nationality'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          rootName={rootName}
          component={CountrySelect}
          control={control}
          name='countryOfResidence'
          label='Country of Residence'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          rootName={rootName}
          component={Input}
          control={control}
          name='email'
          label='Email'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          rootName={rootName}
          component={Input}
          control={control}
          name='contactNumber'
          label='Contact Number'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          rootName={rootName}
          component={GenderSelect}
          control={control}
          name='gender'
          label='Gender'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          rootName={rootName}
          component={MartialStatusSelect}
          control={control}
          name='maritalStatus'
          label='Marital Status'
        />
      </Grid>
    </Grid>
  )
}
