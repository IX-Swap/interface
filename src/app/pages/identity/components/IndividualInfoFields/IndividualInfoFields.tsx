import { Box, Grid, TextField } from '@mui/material'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { IndividualPersonalInformation } from 'app/pages/identity/types/forms'
import { GenderSelect } from 'components/form/GenderSelect'
import { PhoneInput } from 'components/form/PhoneInput'
import { TypedField } from 'components/form/TypedField'
import { DataroomFileType } from 'config/dataroom'
import { subYears } from 'date-fns'
import { privateClassNames } from 'helpers/classnames'
import {
  dateTimeValueExtractor,
  hasValue,
  plainValueExtractor,
  textValueExtractor
} from 'helpers/forms'
import { capitalizeFirstLetter } from 'helpers/strings'
import { useIndividualDefaultInfo } from 'hooks/auth/useIndividualDefaultInfo'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { DatePicker } from 'components/form/DatePicker'
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'
import { IndividualNationalityField } from 'app/pages/identity/components/IndividualInfoFields/IndividualNationalityField'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { TextInput } from 'ui/TextInput/TextInput'
import { OptionalLabel } from 'components/form/OptionalLabel'

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
  const { isSingPass, singPassData } = useIsSingPass()
  const nationality = watch('nationality')

  useEffect(() => {
    if (nationality !== 'Singapore') {
      control.setValue('nric', '')
      clearErrors('nric')
    }
  }, [nationality]) // eslint-disable-line

  return (
    <Grid container>
      <Box>
        <Box marginRight={2}>
          <TypedField
            customRenderer
            component={FileUpload}
            placeHolder='Upload File'
            control={control}
            rootName={rootName}
            name='photo'
            label={<OptionalLabel label='Upload Photo' />}
            valueExtractor={documentValueExtractor}
            accept={DataroomFileType.image}
            documentInfo={{
              type: 'User Photo'
            }}
          />
        </Box>
        <Grid container spacing={5} style={{ marginTop: isMobile ? 8 : 20 }}>
          {isSingPass && (
            <Grid item xs={12}>
              <TextField
                label='Principal Name'
                value={singPassData?.name}
                disabled
                fullWidth
              />
            </Grid>
          )}
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
              label={<OptionalLabel label='Middle Name' />}
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
              disabled={isSingPass && hasValue(singPassData?.dob)}
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
              disabled={isSingPass && hasValue(singPassData?.sex)}
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
              defaultValue={defaultEmail}
              variant='outlined'
              disabled={isSingPass && hasValue(singPassData?.email)}
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
              component={IndividualNationalityField}
              control={control}
              name='nationality'
              label='Nationality'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              rootName={rootName}
              component={TextInput}
              control={control}
              name='nric'
              label='NRIC/FIN'
              variant='outlined'
              hideIcon
              placeholder={
                nationality !== 'Singapore' ? 'Not Required' : 'NRIC/FIN'
              }
              disabled={
                (isSingPass && hasValue(singPassData?.uinfin)) ||
                nationality !== 'Singapore'
              }
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
