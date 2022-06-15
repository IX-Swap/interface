import React from 'react'
import { Grid, Box, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { documentValueExtractor } from 'app/components/DSO/utils'
import {
  dateTimeValueExtractor,
  hasValue,
  plainValueExtractor,
  textValueExtractor
} from 'helpers/forms'
import { GenderSelect } from 'components/form/GenderSelect'
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
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'
import { IndividualNationalityField } from 'app/pages/identity/components/IndividualInfoFields/IndividualNationalityField'

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
  const { isSingPass, singPassData, individualIdentity } = useIsSingPass()

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
              maxDate={subYears(new Date(), 18)}
              disabled={isSingPass && hasValue(singPassData?.dob)}
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
              defaultValue={defaultEmail}
              variant='outlined'
              disabled={isSingPass && hasValue(singPassData?.email)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <IndividualNationalityField rootName={rootName} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
              rootName={rootName}
              component={GenderSelect}
              control={control}
              name='gender'
              label='Gender'
              variant='outlined'
              disabled={isSingPass && hasValue(singPassData?.sex)}
            />
          </Grid>
          {isSingPass && (
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label='NRIC/FIN'
                disabled
                value={individualIdentity?.uinfin}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Grid>
  )
}
