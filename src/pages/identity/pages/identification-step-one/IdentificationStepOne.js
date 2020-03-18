import React, { useEffect } from 'react'
import { Grid, Card, TextField, Typography, Box, Button, CircularProgress, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core'
import { useIdentityState, useIdentityDispatch, getIdentity, saveIdentity, IDENTITY_STATUS } from 'context/IdentityContext'
import { useForm, Controller } from 'react-hook-form'
import IdentityProgress from 'pages/identity/components/IdentityProgress'
import * as yup from 'yup'
import countryNamesJson from 'country-json/src/country-by-name.json'
import { useMemo } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { subYears, subHours } from 'date-fns'

export default function IdentificationStepOne () {
  const { status, handleSubmit, fields, isValid } = useIdentityFormLogic()

  return (
    <Grid component='article' container justify='center' spacing={3}>
      <Grid item xs={12} sm={10} md={8}>
        <Card component='form' onSubmit={handleSubmit}>
          <Box p={3}>
            <Typography component='h1' variant='h3' align='center'>Identification</Typography>

            <Box mt={3}>
              <IdentityProgress />
            </Box>

            {['INIT', 'GETTING'].includes(status) ? (
              <Box p={3} display='flex' justifyContent='center'>
                <CircularProgress size={48} />
              </Box>
            ) : (
              <>
                <Box component='section' mt={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Controller as={TextField} fullWidth margin='dense' label='First Name' {...fields.firstName} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller as={TextField} fullWidth margin='dense' label='Middle Name' {...fields.middleName} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller as={TextField} fullWidth margin='dense' label='Last Name' {...fields.lastName} />
                    </Grid>
                  </Grid>
                </Box>

                <Box mt={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <SelectGroup label='Gender' {...fields.gender} />

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

                      <SelectGroup label='Marital Status' {...fields.maritalStatus} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller as={TextField} fullWidth margin='dense' label='Contact Number' {...fields.contactNumber} />
                      <SelectGroup label='Nationality' {...fields.nationality} />
                    </Grid>
                  </Grid>
                </Box>

                <Box display='flex' justifyContent='flex-end' mt={6}>
                  <Button disabled={!isValid || status !== 'IDLE'} type='submit' variant='contained' color='primary'>
                    {status === 'SAVING'
                      ? 'Saving...'
                      : 'Save'}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

// ############################################################

const useIdentityFormLogic = () => {
  const { status, shouldCreateNew, identity } = useIdentityState()
  const idDispatch = useIdentityDispatch()
  const validationSchema = useMemo(createSchema, [])
  const methods = useForm({ validationSchema })
  const { handleSubmit: rhfHandleSubmit, errors, control, setValue, formState } = methods
  const isValid = formState.isSubmitted ? formState.isValid : true

  // load identity data to form when it updates from reducer
  const ADDRESS_KEYS = ['unit', 'line1', 'line2']
  useEffect(() => {
    const isLoadedDataEmpty = !identity || !Object.keys(identity).length
    if (isLoadedDataEmpty) return

    Object.keys(fields)
      .forEach(fieldName => {
        const isAddr = ADDRESS_KEYS.includes(fieldName)
        const loadedFieldValue = isAddr
          ? (identity.address && identity.address[fieldName])
          : identity[fieldName]
        if (!loadedFieldValue) return
        setValue(fieldName, loadedFieldValue)
      })
  }, [identity]) // eslint-disable-line react-hooks/exhaustive-deps

  // fetch identity data for initial values
  useEffect(() => {
    if (status === IDENTITY_STATUS.INIT) getIdentity(idDispatch)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // saves identity data for on form submit
  const handleSubmit = rhfHandleSubmit(newIdentity => {
    saveIdentity(idDispatch, newIdentity, shouldCreateNew)
  })

  const createFieldProps = (key, overrides) =>
    ({
      name: key,
      error: errors[key] && errors[key].message,
      helperText: (errors[key] && errors[key].message) || '',
      defaultValue: '',
      control,
      ...overrides
    })

  const fields = {
    firstName: createFieldProps('firstName'),
    middleName: createFieldProps('middleName'),
    lastName: createFieldProps('lastName'),
    contactNumber: createFieldProps('contactNumber'),
    dob: createFieldProps('dob', { defaultValue: createDate18YearsAndADayAgo() }),
    maritalStatus: createFieldProps('maritalStatus', { options: MARITAL_STATUSES_OPTS }),
    gender: createFieldProps('gender', { options: GENDERS_OPTS }),
    nationality: createFieldProps('nationality', { options: COUNTRIES_OPTS })
  }

  return { status, handleSubmit, fields, methods, isValid }
}

const arrToOpts = arr => arr.map(value => ({ value, label: value }))

const MARITAL_STATUSES = ['Married', 'Widowed', 'Separated', 'Single']
const MARITAL_STATUSES_OPTS = arrToOpts(MARITAL_STATUSES)
const COUNTRIES = countryNamesJson.map(c => c.country)
const COUNTRIES_OPTS = arrToOpts(COUNTRIES)
const GENDERS = ['M', 'F']
const GENDERS_OPTS = [{ value: 'M', label: 'Male'}, { value: 'F', label: 'Female'}]

const createSchema = () =>
  yup.object().shape({
    firstName: yup.string().required('First name is required'),
    middleName: yup.string(),
    lastName: yup.string().required('Last name is required'),
    dob: yup.date('Date of birth is required')
      .max(createDate18YearsAgo(), 'You must be at least 18 years old')
      .required('Date of birth is required'),
    maritalStatus: yup.mixed()
      .oneOf(MARITAL_STATUSES, 'Marital status is required')
      .required('Marital status is required'),
    gender: yup.mixed()
      .oneOf(GENDERS, 'Gender is required')
      .required('Gender is required'),
    contactNumber: yup.string()
      .required('Contact number is required'),
    nationality: yup.mixed()
      .oneOf(COUNTRIES, 'Nationality is required')
      .required('Nationality is required'),
  })

const SelectGroup = (props) => {
  const { options, label, error, helperText, ...controllerProps } = props
  const { name } = controllerProps

  return (
    <FormControl margin='dense' fullWidth error={!!error}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        fullWidth
        labelId={`${name}-label`}
        as={
          <Select>
            {options.map(({ value, label }) =>
              <MenuItem key={value} value={value}>{label}</MenuItem>)}
          </Select>
        }
        {...controllerProps}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

const createDate18YearsAgo = () => subYears(new Date(), 18)
const createDate18YearsAndADayAgo = () => subHours(subYears(new Date(), 18), 1)
