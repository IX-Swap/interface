import React, { useEffect, useMemo, useState, useCallback } from 'react'
import {
  Grid,
  Card,
  TextField,
  Typography,
  Box,
  Button,
  // CircularProgress,
  Snackbar,
  IconButton
} from '@material-ui/core'

import { useHistory } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { DatePicker } from '@material-ui/pickers'
import CloseIcon from '@material-ui/icons/Close'

// import {
//   useIdentityState,
//   useIdentityDispatch,
//   getCorporate,
//   IDENTITY_STATUS
// } from 'context/IdentityContext'

import { GENDERS_OPTS, COUNTRIES_OPTS } from 'const'
import SelectGroup from 'pages/identity/components/SelectGroup/SelectGroup'
import createDate18YearsAgo from 'pages/identity/helpers/createDate18YearsAgo'
import { createCorporate } from 'pages/identity/helpers/schema'
import createDate18YearsAndADayAgo from 'pages/identity/helpers/createDate18YearsAndADayAgo'
import UploadSection from 'pages/identity/components/UploadSection/UploadSection'

export default function CorporateForm () {
  const {
    handleSubmit,
    numOfOwners,
    numOfReps,
    numOfDirectors,
    setNumOfOwners,
    setNumOfDirectors,
    setNumOfReps,
    repsTemplate,
    ownersTemplate,
    directorsTemplate,
    snackbarError,
    handleSnackbarErrorClose,
    companyFields
  } = useCorporateFormLogic()

  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item sm={12} md={8} lg={8}>
        <Card component='form' onSubmit={handleSubmit}>
          <Box p={3} m={3}>
            <Typography variant='h3'>Company Registration Info</Typography>
            <CompanyRegistration fields={companyFields} />
          </Box>
          <Box p={3} m={3}>
            <Typography variant='h3'>Company Address</Typography>
            <CompanyAddress fields={companyFields} />
          </Box>
          <Box p={3} m={3}>
            <Typography variant='h3'>Company Representatives</Typography>
            {repsTemplate}
            <PeopleButtons setter={setNumOfReps} getter={numOfReps} />
          </Box>
          <Box p={3} m={3}>
            <Typography variant='h3'>Directors</Typography>
            {directorsTemplate}
            <PeopleButtons setter={setNumOfDirectors} getter={numOfDirectors} />
          </Box>
          <Box p={3} m={3}>
            <Typography variant='h3'>Beneficial Owners</Typography>
            {ownersTemplate}
            <PeopleButtons setter={setNumOfOwners} getter={numOfOwners} />
          </Box>
          <Box p={3} m={3}>
            <Typography variant='h3'>Declaration & Acknowledgement</Typography>
            <Declarations field={companyFields} />
          </Box>
        </Card>
        <Snackbar
          message={snackbarError}
          open={!!snackbarError}
          action={
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleSnackbarErrorClose}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          }
        />
      </Grid>
    </Grid>
  )
}

const CompanyRegistration = ({ fields }) => {
  return (
    <Box m={4}>
      <Grid container>
        <Grid item sm={12} md={12} lg={6}>
          <Box m={1}>
            <Controller
              as={TextField}
              fullWidth
              margin='dense'
              label='Company Legal Name'
              {...fields.companyLegalName}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Box m={1}>
            <Controller
              as={TextField}
              fullWidth
              margin='dense'
              label='Company Registration Number'
              {...fields.companyRegistrationNumber}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Box m={1}>
            <SelectGroup
              label='Country of Formation'
              {...fields.countryOfFormation}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Box m={1}>
            <Controller
              fullWidth
              margin='dense'
              label='Date of Formation'
              disableFuture
              openTo='year'
              format='MM/dd/yyyy'
              views={['year', 'month', 'date']}
              maxDate={createDate18YearsAgo()}
              as={DatePicker}
              {...fields.dateOfIncorporation}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
          <Box m={1}>
            <UploadSection
              label='Company Registration File'
              buttonLabel='Registration File'
              emptyLabel='Please upload company registration file.'
              {...fields.registrationRecordFile}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
          <Box m={1}>
            <UploadSection
              label='Articles of Incorporation File'
              buttonLabel='Articles File'
              emptyLabel='Please upload company articles.'
              {...fields.articlesOfIncorporationFile}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

const CompanyAddress = ({ fields }) => {
  return (
    <Box m={4}>
      <Grid container>
        <Grid item sm={12} md={12} lg={6}>
          <Box m={1}>
            <Controller
              as={TextField}
              fullWidth
              margin='dense'
              label='Line 1'
              {...fields.companyAddress.line1}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Box m={1}>
            <Controller
              as={TextField}
              fullWidth
              margin='dense'
              label='Line 2'
              {...fields.companyAddress.line2}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm={12} md={12} lg={4}>
          <Box m={1}>
            <Controller
              as={TextField}
              fullWidth
              margin='dense'
              label='Unit'
              {...fields.companyAddress.unit}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={4}>
          <Box m={1}>
            <Controller
              as={TextField}
              fullWidth
              margin='dense'
              label='City'
              {...fields.companyAddress.city}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={4}>
          <Box m={1}>
            <Controller
              as={TextField}
              fullWidth
              margin='dense'
              label='Postal Code'
              {...fields.companyAddress.postalCode}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm={12} md={12} lg={6}>
          <Box m={1}>
            <Controller
              as={TextField}
              fullWidth
              margin='dense'
              label='Province / State'
              {...fields.companyAddress.state}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Box m={1}>
            <SelectGroup label='Country' {...fields.companyAddress.country} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

const Person = ({ title, fields, index }) => {
  return (
    <Box key={index} m={4}>
      <Grid container>
        <Grid item md={12} lg={12}>
          <Typography variant='h5'>{title}</Typography>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Box m={1}>
            <Controller
              as={TextField}
              fullWidth
              margin='dense'
              label='First Name'
              {...fields.firstName}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Box m={1}>
            <Controller
              as={TextField}
              fullWidth
              margin='dense'
              label='Middle Name(s)'
              {...fields.middleNames}
            />
          </Box>
        </Grid>{' '}
        <Grid item sm={12} md={6} lg={4}>
          <Box m={1}>
            <Controller
              as={TextField}
              fullWidth
              margin='dense'
              label='Last Name'
              {...fields.lastName}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Box m={1}>
            <SelectGroup label='Gender' {...fields.gender} />
          </Box>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Box m={1}>
            <Controller
              fullWidth
              margin='dense'
              label='Date of Birth'
              disableFuture
              openTo='year'
              format='MM/dd/yyyy'
              views={['year', 'month', 'date']}
              maxDate={createDate18YearsAgo()}
              as={DatePicker}
              {...fields.dob}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Box m={1}>
            <SelectGroup label='Nationality' {...fields.nationality} />
          </Box>
        </Grid>
        <Grid item sm={12} md={7} lg={6}>
          <Box m={1}>
            <Controller
              as={TextField}
              fullWidth
              margin='dense'
              label='Email Address'
              {...fields.email}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={7} lg={6}>
          <Box m={1}>
            <Controller
              as={TextField}
              fullWidth
              margin='dense'
              label='Phone Number'
              {...fields.contactNumber}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
          <Box m={1}>
            <UploadSection
              label='Passport File'
              buttonLabel='Passport'
              emptyLabel='Please upload a photo or scan of passport.'
              {...fields.idFile}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

const PeopleButtons = ({ getter, setter }) => {
  function update () {
    if (getter > 1) setter(getter - 1)
  }

  return (
    <Grid container alignItems='flex-start' justify='flex-end' direction='row'>
      <Grid item lg={2}>
        {getter > 1 ? (
          <Button color='primary' onClick={update}>
            REMOVE
          </Button>
        ) : (
          ''
        )}
      </Grid>
      <Grid item lg={2}>
        <Button variant='outlined' onClick={() => setter(getter + 1)}>
          ADD
        </Button>
      </Grid>
    </Grid>
  )
}

const Declarations = () => {
  return (
    <Box m={4}>
      <Grid container>
        <Grid item lg={5}>
          <Box m={2}></Box>
        </Grid>
        <Grid item lg={5}>
          <Box m={2}></Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={5}>
          <Box m={2}></Box>
        </Grid>
        <Grid item lg={5}>
          <Box m={2}></Box>
        </Grid>
      </Grid>
    </Box>
  )
}

const useCorporateFormLogic = () => {
  const validationSchema = useMemo(createCorporate, [])
  const [snackbarError, setSnackbarError] = useState('')
  const methods = useForm({ validationSchema })

  const {
    handleSubmit: rhfHandleSubmit,
    errors,
    watch,
    triggerValidation,
    control,
    setValue,
    getValues,
    formState
  } = methods

  const isValid = formState.isSubmitted ? formState.isValid : true
  const history = useHistory()
  const handleSnackbarErrorClose = useCallback(() => setSnackbarError(''), [])

  const createFieldProps = (key, overrides) => ({
    name: key,
    error: Boolean(errors[key] && errors[key].message),
    helperText: (errors[key] && errors[key].message) || '',
    defaultValue: '',
    control,
    ...overrides
  })
  const handleFileChange = name => files => {
    setValue(name, files)
  }

  const companyFields = {
    // company registration
    companyName: createFieldProps('companyName', { required: true }),
    companyRegistrationNumber: createFieldProps('companyRegistrationNumber', {
      required: true
    }),
    companyLegalName: createFieldProps('companyLegalName', { required: true }),
    countryOfFormation: createFieldProps('countryOfFormation', {
      options: COUNTRIES_OPTS,
      required: true
    }),
    dateOfIncorporation: createFieldProps('dob', {
      defaultValue: createDate18YearsAndADayAgo(),
      required: true
    }),
    registrationRecordFile: createFieldProps('registrationRecordFile', {
      onChange: handleFileChange('registrationRecordFile'),
      value: watch('registrationRecordFile'),
      triggerValidation,
      required: true
    }),
    articlesOfIncorporationFile: createFieldProps(
      'articlesOfIncorporationFile',
      {
        onChange: handleFileChange('articlesOfIncorporationFile'),
        value: watch('articlesOfIncorporationFile'),
        triggerValidation,
        required: true
      }
    ),
    // address
    companyAddress: {
      unit: createFieldProps('unit'),
      line1: createFieldProps('line1', { required: true }),
      line2: createFieldProps('line2'),
      city: createFieldProps('city', { required: true }),
      state: createFieldProps('state', { required: true }),
      country: createFieldProps('country', {
        options: COUNTRIES_OPTS,
        required: true
      }),
      postalCode: createFieldProps('postalCode', { required: true })
    }
  }

  function PersonFields (type, i) {
    return {
      firstName: createFieldProps(`${type}-firstName-${i}`, { required: true }),
      middleNames: createFieldProps(`${type}-middleNames-${i}`, {
        required: true
      }),
      lastName: createFieldProps(`${type}-lastName-${i}`, { required: true }),
      gender: createFieldProps(`${type}-gender-${i}`, {
        options: GENDERS_OPTS,
        required: true
      }),
      dob: createFieldProps(`${type}-dob-${i}`, {
        defaultValue: createDate18YearsAndADayAgo(),
        required: true
      }),
      nationality: createFieldProps(`${type}-nationality-${i}`, {
        options: COUNTRIES_OPTS,
        required: true
      }),
      email: createFieldProps(`${type}-email-${i}`, { required: true }),
      contactNumber: createFieldProps(`${type}-phoneNumber-${i}`, {
        required: true
      }),
      idFile: createFieldProps(`${type}-idFile-${i}`, {
        onChange: handleFileChange(`${type}-idFile-${i}`),
        value: watch(`${type}-idFile-${i}`),
        triggerValidation,
        required: true
      })
    }
  }

  const [numOfOwners, setNumOfOwners] = useState(1)
  const [numOfDirectors, setNumOfDirectors] = useState(1)
  const [numOfReps, setNumOfReps] = useState(1)

  const buildTemplate = (getter, title) => {
    const fields = []
    const template = []
    for (let i = 1; i <= getter; i++) {
      fields.push(new PersonFields(title, i))
      template.push(
        <Person
          key={i}
          fields={fields[i - 1]}
          title={`${title} #${i}`}
          index={i}
        />
      )
    }
    return template
  }

  const repsTemplate = buildTemplate(numOfReps, 'Representative')
  const ownersTemplate = buildTemplate(numOfOwners, 'Beneficial-Owner')
  const directorsTemplate = buildTemplate(numOfDirectors, 'Director')

  return {
    companyFields,
    numOfOwners,
    setNumOfOwners,
    numOfDirectors,
    setNumOfDirectors,
    numOfReps,
    setNumOfReps,
    repsTemplate,
    directorsTemplate,
    ownersTemplate,
    snackbarError,
    handleSnackbarErrorClose
  }
}
