import React, { useEffect, useState, useCallback } from 'react'
import {
  Grid,
  Card,
  TextField,
  Typography,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  IconButton
} from '@material-ui/core'
import {
  useIdentityState,
  useIdentityDispatch,
  getIdentity,
  saveIdentity,
  IDENTITY_STATUS
} from 'context/IdentityContext'
import { useForm, Controller } from 'react-hook-form'
import IdentityProgress from 'pages/identity/components/IdentityProgress'
import { useMemo } from 'react'
import { DatePicker } from '@material-ui/pickers'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'
import { MARITAL_STATUSES_OPTS, GENDERS_OPTS, COUNTRIES_OPTS } from 'const'
import SelectGroup from 'pages/identity/components/SelectGroup/SelectGroup'
import createDate18YearsAgo from 'pages/identity/helpers/createDate18YearsAgo'
import { createIDBasic } from 'pages/identity/helpers/schema'
import createDate18YearsAndADayAgo from 'pages/identity/helpers/createDate18YearsAndADayAgo'

export default function IdentificationStepOne () {
  const {
    status,
    handleSubmit,
    fields,
    isValid,
    error,
    snackbarError,
    handleSnackbarErrorClose
  } = useIdentityFormLogic()

  return (
    <Grid component='article' container justify='center' spacing={3}>
      <Grid item xs={12} sm={10} md={8}>
        <Card component='form' onSubmit={handleSubmit} noValidate>
          <Box p={3}>
            <Typography component='h1' variant='h3' align='center'>
              Identification
            </Typography>

            <Box mt={3} mx={-3}>
              <IdentityProgress />
            </Box>

            {['INIT', 'GETTING'].includes(status) ? (
              <Box p={3} display='flex' justifyContent='center'>
                <CircularProgress size={48} />
              </Box>
            ) : error.get ? (
              <Alert severity='error'>{error.get}</Alert>
            ) : (
              <>
                <Box component='section' mt={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        as={TextField}
                        fullWidth
                        margin='dense'
                        label='First Name'
                        {...fields.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        as={TextField}
                        fullWidth
                        margin='dense'
                        label='Middle Name'
                        {...fields.middleName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        as={TextField}
                        fullWidth
                        margin='dense'
                        label='Last Name'
                        {...fields.lastName}
                      />
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

                      <SelectGroup
                        label='Marital Status'
                        {...fields.maritalStatus}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        as={TextField}
                        fullWidth
                        margin='dense'
                        label='Contact Number'
                        {...fields.contactNumber}
                      />
                      <SelectGroup
                        label='Nationality'
                        {...fields.nationality}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box display='flex' justifyContent='flex-end' mt={6}>
                  <Button
                    disabled={!isValid || status !== 'IDLE'}
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    {status === 'SAVING' ? 'Saving...' : 'Save & Next'}
                  </Button>
                </Box>
              </>
            )}
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

// ############################################################

const useIdentityFormLogic = () => {
  const { status, shouldCreateNew, error } = useIdentityState()
  const [snackbarError, setSnackbarError] = useState('')
  const idDispatch = useIdentityDispatch()
  const validationSchema = useMemo(createIDBasic, [])
  const methods = useForm({ validationSchema })
  const { handleSubmit: rhfHandleSubmit, errors, control, formState } = methods
  const isValid = formState.isSubmitted ? formState.isValid : true
  const history = useHistory()

  const handleSnackbarErrorClose = useCallback(() => setSnackbarError(''), [])

  // fetch identity data for initial values
  useEffect(() => {
    if (status === IDENTITY_STATUS.INIT) {
      getIdentity(idDispatch).catch(() => {})
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // saves identity data for on form submit
  const handleSubmit = rhfHandleSubmit(newIdentity => {
    saveIdentity(idDispatch, newIdentity, shouldCreateNew)
      .then(() => history.push('/app/identity/identification-steps/2'))
      .catch(e => setSnackbarError(e.message || e.toString()))
  })

  const createFieldProps = (key, overrides) => ({
    name: key,
    error: Boolean(errors[key] && errors[key].message),
    helperText: (errors[key] && errors[key].message) || '',
    defaultValue: '',
    control,
    ...overrides
  })

  const fields = {
    firstName: createFieldProps('firstName', { required: true }),
    middleName: createFieldProps('middleName'),
    lastName: createFieldProps('lastName', { required: true }),
    contactNumber: createFieldProps('contactNumber', { required: true }),
    dob: createFieldProps('dob', {
      defaultValue: createDate18YearsAndADayAgo(),
      required: true
    }),
    maritalStatus: createFieldProps('maritalStatus', {
      options: MARITAL_STATUSES_OPTS,
      required: true
    }),
    gender: createFieldProps('gender', {
      options: GENDERS_OPTS,
      required: true
    }),
    nationality: createFieldProps('nationality', {
      options: COUNTRIES_OPTS,
      required: true
    })
  }

  return {
    status,
    handleSubmit,
    fields,
    methods,
    isValid,
    error,
    snackbarError,
    handleSnackbarErrorClose
  }
}
