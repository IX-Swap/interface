import React from 'react'
import { IndividualPersonalInformation } from 'types/identity'
import { Grid, Box, TextField } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { dateTimeValueExtractor, plainValueExtractor } from 'helpers/forms'
import { NationalitySelect } from 'components/form/NationalitySelect'
import { useIndividualInfoDefaultEmail } from 'hooks/auth/useIndividualInfoDefaultEmail'
import { DataroomFileType } from 'config/dataroom'
import { privateClassNames } from 'helpers/classnames'
import { Dropzone } from 'components/dataroom/Dropzone'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { PhoneInput } from 'components/form/PhoneInput'

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
    isDisabled: isEmailDisabled
  } = useIndividualInfoDefaultEmail(rootName)
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid container>
      <Box display={'flex'} flexDirection={isMobile ? 'column' : 'row'}>
        <Box marginRight={2}>
          {/* @ts-ignore */}
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
        <Grid container spacing={2} style={{ marginTop: isMobile ? 8 : 20 }}>
          <Grid item xs={12} sm={6}>
            <TypedField
              rootName={rootName}
              component={TextField}
              control={control}
              name='firstName'
              label='First Name'
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TypedField
              rootName={rootName}
              component={TextField}
              control={control}
              name='middleName'
              label='Middle Name'
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TypedField
              rootName={rootName}
              component={TextField}
              control={control}
              name='lastName'
              label='Last Name'
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* @ts-ignore */}
            <TypedField
              className={privateClassNames()}
              rootName={rootName}
              control={control}
              name='dob'
              label='Date of Birth'
              component={DateTimePicker}
              customRenderer
              valueExtractor={dateTimeValueExtractor}
              inputVariant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
