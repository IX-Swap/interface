import React from 'react'
import { Grid, Box, TextField } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { documentValueExtractor } from 'app/components/DSO/utils'
import {
  dateTimeValueExtractor,
  plainValueExtractor,
  textValueExtractor
} from 'helpers/forms'
import { NationalitySelect } from 'components/form/NationalitySelect'
import { useIndividualDefaultInfo } from 'hooks/auth/useIndividualDefaultInfo'
import { DataroomFileType } from 'config/dataroom'
import { privateClassNames } from 'helpers/classnames'
import { Dropzone } from 'components/dataroom/Dropzone'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { PhoneInput } from 'components/form/PhoneInput'
import { DatePicker } from 'components/form/DatePicker'
import { IndividualPersonalInformation } from 'app/pages/identity/types/forms'
import { subYears } from 'date-fns'
import { capitalizeFirstLetter } from 'helpers/strings'

export interface IndividualInfoFieldsProps {
  rootName?: string
}

export const IndividualInfoFields = (
  props: IndividualInfoFieldsProps
): JSX.Element => {
  const { rootName } = props
  const { control } = useFormContext<IndividualPersonalInformation>()
  const {
    email: defaultEmail,
    firstName: defaultFirstName,
    lastName: defaultLastName,
    middleName: defaultMiddleName
  } = useIndividualDefaultInfo(rootName)
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid container>
      <Box>
        <Box marginRight={2}>
          <TypedField
            customRenderer
            component={Dropzone}
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
        <Grid container spacing={6} style={{ marginTop: isMobile ? 8 : 20 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
              rootName={rootName}
              component={TextField}
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
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
              rootName={rootName}
              component={TextField}
              control={control}
              name='middleName'
              label='Middle Name'
              defaultValue={
                defaultMiddleName !== undefined
                  ? capitalizeFirstLetter(defaultMiddleName)
                  : ''
              }
              variant='outlined'
              valueExtractor={textValueExtractor}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
              rootName={rootName}
              component={TextField}
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
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
              className={privateClassNames()}
              rootName={rootName}
              control={control}
              name='dob'
              label='Date of Birth'
              component={DatePicker}
              openTo='year'
              customRenderer
              defaultValue={null as any}
              valueExtractor={dateTimeValueExtractor}
              inputVariant='outlined'
              maxDate={subYears(new Date(), 18)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
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
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
              rootName={rootName}
              component={TextField}
              control={control}
              name='email'
              label='Email'
              // disabled={isEmailDisabled}
              defaultValue={defaultEmail}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
              rootName={rootName}
              component={NationalitySelect}
              control={control}
              name='nationality'
              label='Citizenship'
              variant='outlined'
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
