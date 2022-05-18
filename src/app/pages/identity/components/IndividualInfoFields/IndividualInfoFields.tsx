import { Box, Grid } from '@mui/material'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { IndividualPersonalInformation } from 'app/pages/identity/types/forms'
import { GenderSelect } from 'components/form/GenderSelect'
import { NationalitySelect } from 'components/form/NationalitySelect'
import { PhoneInput } from 'components/form/PhoneInput'
import { TypedField } from 'components/form/TypedField'
import { DataroomFileType } from 'config/dataroom'
import { subYears } from 'date-fns'
import { privateClassNames } from 'helpers/classnames'
import {
  dateTimeValueExtractor,
  plainValueExtractor,
  textValueExtractor
} from 'helpers/forms'
import { capitalizeFirstLetter } from 'helpers/strings'
import { useIndividualDefaultInfo } from 'hooks/auth/useIndividualDefaultInfo'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { TextInput } from 'ui/TextInput/TextInput'
import { DatePicker } from 'ui/DateTimePicker/DatePicker'

export interface IndividualInfoFieldsProps {
  rootName?: string
}

export const IndividualInfoFields = (
  props: IndividualInfoFieldsProps
): JSX.Element => {
  const { rootName } = props
  const { control, watch, clearErrors } =
    useFormContext<IndividualPersonalInformation>()
  const {
    email: defaultEmail,
    firstName: defaultFirstName,
    lastName: defaultLastName,
    middleName: defaultMiddleName
  } = useIndividualDefaultInfo(rootName)
  const { isMobile } = useAppBreakpoints()
  const nationality = watch('nationality')

  useEffect(() => {
    if (nationality !== 'Singapore') {
      control.setValue('nric', '')
      clearErrors('nric')
    }
  }, []) // eslint-disable-line

  return (
    <Grid container>
      <Box>
        <Box marginRight={2}>
          <TypedField
            customRenderer
            component={FileUpload}
            control={control}
            rootName={rootName}
            name='photo'
            label='Upload Your Photo'
            valueExtractor={documentValueExtractor}
            accept={DataroomFileType.image}
            documentInfo={{
              type: 'User Photo'
            }}
          />
        </Box>
        <Grid container spacing={2} style={{ marginTop: isMobile ? 8 : 20 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
              rootName={rootName}
              component={TextInput}
              control={control}
              name='firstName'
              label='First Name'
              defaultValue={
                defaultFirstName !== undefined
                  ? capitalizeFirstLetter(defaultFirstName)
                  : ''
              }
              variant='outlined'
              valueExtractor={textValueExtractor}
              placeholder='First Name'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
              rootName={rootName}
              component={TextInput}
              control={control}
              name='middleName'
              label='Middle Name (Optional)'
              defaultValue={
                defaultMiddleName !== undefined
                  ? capitalizeFirstLetter(defaultMiddleName)
                  : ''
              }
              variant='outlined'
              valueExtractor={textValueExtractor}
              placeholder='Middle Name'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
              rootName={rootName}
              component={TextInput}
              control={control}
              name='lastName'
              label='Last Name'
              defaultValue={
                defaultLastName !== undefined
                  ? capitalizeFirstLetter(defaultLastName)
                  : ''
              }
              variant='outlined'
              valueExtractor={textValueExtractor}
              placeholder='Last Name'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              rootName={rootName}
              control={control}
              name='dob'
              label='Date'
              component={DatePicker}
              customRenderer
              defaultValue={null as any}
              valueExtractor={dateTimeValueExtractor}
              maxDate={subYears(new Date(), 18)}
              variant='date'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              rootName={rootName}
              component={GenderSelect}
              control={control}
              name='gender'
              label='Gender'
              variant='outlined'
              customRenderer
              placeholder='Select Gender'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              fullWidth
              rootName={rootName}
              component={TextInput}
              control={control}
              name='email'
              label='Email'
              // disabled={isEmailDisabled}
              defaultValue={defaultEmail}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              fullWidth
              style={{ width: '100%' }}
              className={privateClassNames()}
              rootName={rootName}
              component={PhoneInput}
              valueExtractor={plainValueExtractor}
              control={control}
              name='contactNumber'
              label='Contact Number'
              customRenderer
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              rootName={rootName}
              component={NationalitySelect}
              control={control}
              name='nationality'
              label='Nationality'
              variant='outlined'
              placeholder='Select Nationality'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              disabled={nationality !== 'Singapore'}
              rootName={rootName}
              component={TextInput}
              control={control}
              name='nric'
              label='NRIC/FIN'
              variant='outlined'
              placeholder={
                nationality !== 'Singapore' ? 'Not Required' : 'NRIC/FIN'
              }
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
