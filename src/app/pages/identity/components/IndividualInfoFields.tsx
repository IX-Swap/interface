import React from 'react'
import { PersonalProfileWithAddress } from 'types/identity'
import { Grid, Input } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { DataroomUploader } from 'components/dataroom/DataroomUploader'
import { DataroomAvatarUploader } from 'components/dataroom/DataroomAvatarUploader'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { DatePicker } from 'components/form/DatePicker'
import { dateTimeValueExtractor } from 'helpers/forms'
import { NationalitySelect } from 'components/form/NationalitySelect'
import { CountrySelect } from 'components/form/CountrySelect'
import { useIndividualInfoDefaultEmail } from 'hooks/auth/useIndividualInfoDefaultEmail'
import { DataroomFileType } from 'config/dataroom'
import { privateClassNames } from 'helpers/classnames'

export interface IndividualInfoFieldsProps {
  rootName?: string
}

export const IndividualInfoFields = (
  props: IndividualInfoFieldsProps
): JSX.Element => {
  const { rootName } = props
  const { control } = useFormContext<PersonalProfileWithAddress>()
  const {
    email: defaultEmail,
    isDisabled: isEmailDisabled
  } = useIndividualInfoDefaultEmail(rootName)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* @ts-ignore */}
        <TypedField
          customRenderer
          component={DataroomUploader}
          control={control}
          rootName={rootName}
          name='photo'
          label='Photo'
          render={DataroomAvatarUploader}
          valueExtractor={documentValueExtractor}
          accept={DataroomFileType.image}
          documentInfo={{
            type: 'User Photo'
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          rootName={rootName}
          component={Input}
          control={control}
          name='firstName'
          label='First Name'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          rootName={rootName}
          component={Input}
          control={control}
          name='middleName'
          label='Middle Name'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          rootName={rootName}
          component={Input}
          control={control}
          name='lastName'
          label='Last Name'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        {/* @ts-ignore */}
        <TypedField
          className={privateClassNames()}
          rootName={rootName}
          control={control}
          name='dob'
          label='Date of Birth'
          component={DatePicker}
          customRenderer
          valueExtractor={dateTimeValueExtractor}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          rootName={rootName}
          component={NationalitySelect}
          control={control}
          name='nationality'
          label='Citizenship'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          rootName={rootName}
          component={CountrySelect}
          control={control}
          name='countryOfResidence'
          label='Country of Residence'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          rootName={rootName}
          component={Input}
          control={control}
          name='email'
          label='Email'
          disabled={isEmailDisabled}
          defaultValue={defaultEmail}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          className={privateClassNames()}
          rootName={rootName}
          component={Input}
          control={control}
          name='contactNumber'
          label='Contact Number'
        />
      </Grid>
    </Grid>
  )
}
