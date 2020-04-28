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
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'
import { COUNTRIES_OPTS } from 'const/countries'
import SelectGroup from 'pages/identity/components/SelectGroup/SelectGroup'
import { createIDAddressSchema } from 'pages/identity/helpers/schema'

export default function IdentificationStepTwo () {
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
              <IdentityProgress activeStep={1} />
            </Box>

            {['INIT', 'GETTING'].includes(status) ? (
              <Box p={3} display='flex' justifyContent='center'>
                <CircularProgress size={48} />
              </Box>
            ) : error.get ? (
              <Alert severity='error'>{error.get}</Alert>
            ) : (
              <>
                <Box mt={4}>
                  <Grid container spacing={3}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      style={{ paddingTop: 0, paddingBottom: 0 }}
                    >
                      <Controller
                        as={TextField}
                        fullWidth
                        margin='dense'
                        label='Unit'
                        {...fields.unit}
                      />
                      <Controller
                        as={TextField}
                        fullWidth
                        margin='dense'
                        label='Line 1'
                        {...fields.line1}
                      />
                      <Controller
                        as={TextField}
                        fullWidth
                        margin='dense'
                        label='Line 2'
                        {...fields.line2}
                      />
                      <Controller
                        as={TextField}
                        fullWidth
                        margin='dense'
                        label='City'
                        {...fields.city}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      style={{ paddingTop: 0, paddingBottom: 0 }}
                    >
                      <Controller
                        as={TextField}
                        fullWidth
                        margin='dense'
                        label='Postal Code'
                        {...fields.postalCode}
                      />
                      <Controller
                        as={TextField}
                        fullWidth
                        margin='dense'
                        label='State'
                        {...fields.state}
                      />
                      <SelectGroup label='Country' {...fields.country} />
                      <SelectGroup
                        label='Country of Residence'
                        {...fields.countryOfResidence}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box display='flex' justifyContent='flex-end' mt={8}>
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
  const { status, shouldCreateNew, identity, error } = useIdentityState()
  const [snackbarError, setSnackbarError] = useState('')
  const idDispatch = useIdentityDispatch()
  const validationSchema = useMemo(createIDAddressSchema, [])
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
  const handleSubmit = rhfHandleSubmit(formData => {
    const newIdentity = {
      ...formData,
      type: 'individual',
      id: identity._id
    }

    saveIdentity(idDispatch, newIdentity, shouldCreateNew)
      .then(() => history.push('/identity/identification-steps/3'))
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
    unit: createFieldProps('unit'),
    line1: createFieldProps('line1', { required: true }),
    line2: createFieldProps('line2'),
    city: createFieldProps('city', { required: true }),
    postalCode: createFieldProps('postalCode'),
    state: createFieldProps('state'),
    country: createFieldProps('country', {
      options: COUNTRIES_OPTS,
      required: true
    }),
    countryOfResidence: createFieldProps('countryOfResidence', {
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
