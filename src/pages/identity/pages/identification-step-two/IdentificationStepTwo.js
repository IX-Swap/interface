import React, { useEffect, useState, useCallback } from 'react'
import { Grid, Card, TextField, Typography, Box, Button, CircularProgress, Snackbar, IconButton } from '@material-ui/core'
import { useIdentityState, useIdentityDispatch, getIdentity, saveIdentity, IDENTITY_STATUS } from 'context/IdentityContext'
import { useForm, Controller } from 'react-hook-form'
import IdentityProgress from 'pages/identity/components/IdentityProgress'
import * as yup from 'yup'
import { useMemo } from 'react'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'
import { COUNTRIES, COUNTRIES_OPTS } from 'const/countries'
import SelectGroup from 'pages/identity/components/SelectGroup/SelectGroup'

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
            <Typography component='h1' variant='h3' align='center'>Identification</Typography>

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
                    <Grid item xs={12} sm={6} style={{ paddingTop: 0, paddingBottom: 0 }}>
                      <Controller as={TextField} fullWidth margin='dense' label='Unit' {...fields.unit} />
                      <Controller as={TextField} fullWidth margin='dense' label='Line 1' {...fields.line1} />
                      <Controller as={TextField} fullWidth margin='dense' label='Line 2' {...fields.line2} />
                      <Controller as={TextField} fullWidth margin='dense' label='City' {...fields.city} />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ paddingTop: 0, paddingBottom: 0 }}>
                      <Controller as={TextField} fullWidth margin='dense' label='Postal Code' {...fields.postalCode} />
                      <Controller as={TextField} fullWidth margin='dense' label='State' {...fields.state} />
                      <SelectGroup label='Country' {...fields.country} />
                      <SelectGroup label='Country of Residence' {...fields.countryOfResidence} />
                    </Grid>
                  </Grid>
                </Box>

                <Box display='flex' justifyContent='flex-end' mt={8}>
                  <Button disabled={!isValid || status !== 'IDLE'} type='submit' variant='contained' color='primary'>
                    {status === 'SAVING'
                      ? 'Saving...'
                      : 'Save & Next'}
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
            <IconButton size='small' aria-label='close' color='inherit' onClick={handleSnackbarErrorClose}>
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
  const validationSchema = useMemo(createSchema, [])
  const methods = useForm({ validationSchema })
  const { handleSubmit: rhfHandleSubmit, errors, control, setValue, formState } = methods
  const isValid = formState.isSubmitted ? formState.isValid : true
  const history = useHistory()

  const handleSnackbarErrorClose = useCallback(() => setSnackbarError(''), [])

  // load identity data to form when it updates from reducer
  useEffect(() => {
    const isLoadedDataEmpty = !identity || !Object.keys(identity).length
    if (isLoadedDataEmpty) return

    Object.keys(fields)
      .forEach(fieldName => {
        const loadedFieldValue = fieldName === 'countryOfResidence'
          ? identity.countryOfResidence
          : identity.address[fieldName]
        if (!loadedFieldValue) return
        setValue(fieldName, loadedFieldValue)
      })
  }, [identity]) // eslint-disable-line react-hooks/exhaustive-deps

  // fetch identity data for initial values
  useEffect(() => {
    if (status === IDENTITY_STATUS.INIT) {
      getIdentity(idDispatch).catch(() => {})
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // saves identity data for on form submit
  const handleSubmit = rhfHandleSubmit(formData => {
    const newIdentity = { ...formData, firstName: identity.firstName }

    saveIdentity(idDispatch, newIdentity, shouldCreateNew)
      .then(() => history.push('/app/identity/identification-steps/3'))
      .catch(e => setSnackbarError(e.message || e.toString()))
  })

  const createFieldProps = (key, overrides) =>
    ({
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

const createSchema = () =>
  yup.object().shape({
    unit: yup.string(),
    line1: yup.string().required('Line 1 is required'),
    line2: yup.string(),
    city: yup.string().required('City is required'),
    postalCode: yup.string().matches(ALPHA_NUMERIC_OR_EMPTY, "Postal Code may only contain alphabet or numbers"),
    state: yup.string(),
    country: yup.mixed()
      .oneOf(COUNTRIES, 'Country is required')
      .required('Country is required'),
    countryOfResidence: yup.mixed()
      .oneOf(COUNTRIES, 'Country of Residence is required')
      .required('Country of Residence is required'),
  })

const ALPHA_NUMERIC_OR_EMPTY = /^([a-z0-9]|(?![\s\S]))+$/i
