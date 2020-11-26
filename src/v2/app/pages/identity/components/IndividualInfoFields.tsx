import React from 'react'
import { PersonalProfileWithAddress } from 'v2/types/identity'
import { Grid, Input } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'v2/components/form/TypedField'
import { DataroomUploader } from 'v2/components/dataroom/DataroomUploader'
import { DataroomAvatarUploader } from 'v2/components/dataroom/DataroomAvatarUploader'
import { documentValueExtractor } from 'v2/app/components/DSO/utils'
import { DatePicker } from 'v2/components/form/DatePicker'
import { dateTimeValueExtractor } from 'v2/helpers/forms'
import { NationalitySelect } from 'v2/components/form/NationalitySelect'
import { CountrySelect } from 'v2/components/form/CountrySelect'
import { GenderSelect } from 'v2/components/form/GenderSelect'
import { MaritalStatusSelect } from 'v2/components/form/MaritalStatusSelect'
import { useIndividualInfoDefaultEmail } from 'v2/hooks/auth/useIndividualInfoDefaultEmail'
import { DataroomFileType } from 'v2/config/dataroom'
import { privateClassNames } from 'v2/helpers/classnames'

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
      <Grid item xs={4}>
        <TypedField
          rootName={rootName}
          component={Input}
          control={control}
          name='firstName'
          label='First Name'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          rootName={rootName}
          component={Input}
          control={control}
          name='middleName'
          label='Middle Name'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          rootName={rootName}
          component={Input}
          control={control}
          name='lastName'
          label='Last Name'
        />
      </Grid>
      <Grid item xs={4}>
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
          // @ts-expect-error
          defaultValue={null}
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          rootName={rootName}
          component={NationalitySelect}
          control={control}
          name='nationality'
          label='Nationality'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          rootName={rootName}
          component={CountrySelect}
          control={control}
          name='countryOfResidence'
          label='Country of Residence'
        />
      </Grid>
      <Grid item xs={4}>
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
      <Grid item xs={4}>
        <TypedField
          className={privateClassNames()}
          rootName={rootName}
          component={Input}
          control={control}
          name='contactNumber'
          label='Contact Number'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          rootName={rootName}
          component={GenderSelect}
          control={control}
          name='gender'
          label='Gender'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          rootName={rootName}
          component={MaritalStatusSelect}
          control={control}
          name='maritalStatus'
          label='Marital Status'
        />
      </Grid>
    </Grid>
  )
}
