import React, { useEffect, useState, useCallback } from 'react'
import { Grid, Card, TextField, Typography, Box, Button, CircularProgress, Snackbar, IconButton } from '@material-ui/core'
import { useIdentityState, useIdentityDispatch, getIdentity, IDENTITY_STATUS } from 'context/IdentityContext'
import { useForm, Controller } from 'react-hook-form'
import IdentityProgress from 'pages/identity/components/IdentityProgress'
import * as yup from 'yup'
import { useMemo } from 'react'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import UploadSection from 'pages/identity/components/UploadSection'

export default function IdentificationStepThree () {
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

            <Box mt={3}>
              <IdentityProgress activeStep={2} />
            </Box>

            {['INIT', 'GETTING'].includes(status) ? (
              <Box p={3} display='flex' justifyContent='center'>
                <CircularProgress size={48} />
              </Box>
            ) : error.get ? (
              <Alert severity='error'>{error.get}</Alert>
            ) : (
              <>
                <Box mx='auto' mt={4} maxWidth='32rem'>
                  <UploadSection
                    label='Passport'
                    emptyLabel='Please upload a photo or scan or your passport.'
                    {...fields.passport}
                  />

                  <Controller as={TextField}
                    fullWidth
                    width='100%'
                    margin='normal'
                    label='Passport ID No.'
                    {...fields.idNumber}
                    helperText={fields.idNumber.error ? fields.idNumber.helperText : 'Please type in your passport ID no.'}
                  />

                  <Box mt={6}>
                    <UploadSection
                      label='Utility Bill'
                      emptyLabel='Please upload a photo or scan of a recent utility bill.'
                      {...fields.utilityBill}
                    />
                  </Box>
                </Box>

                <Box display='flex' justifyContent='flex-end' mt={6}>
                  <Button disabled={!isValid || status !== 'IDLE'} type='submit' variant='contained' color='primary'>
                    {status === 'SAVING'
                      ? 'Saving...'
                      : 'Upload & Finish'}
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
  const { status, identity, error } = useIdentityState()
  const [snackbarError, setSnackbarError] = useState('')
  const idDispatch = useIdentityDispatch()
  const validationSchema = useMemo(createSchema, [])
  const methods = useForm({ validationSchema })

  const {
    handleSubmit: rhfHandleSubmit,
    errors,
    control,
    setValue,
    formState,
    register,
    triggerValidation,
    watch
  } = methods

  const isValid = formState.isSubmitted ? formState.isValid : true

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

  useEffect(() => {
    // register file inputs
    register({ name: 'passport' })
    register({ name: 'utilityBill' })

    // fetch identity data for initial values
    if (status === IDENTITY_STATUS.INIT) {
      getIdentity(idDispatch).catch(() => {})
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // saves identity data for on form submit
  const handleSubmit = rhfHandleSubmit(formData => {
    alert('formData: ' + JSON.stringify(formData))
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

  const handleFileChange = name => files => setValue(name, files)
  const fields = {
    idNumber: createFieldProps('idNumber', { required: true }),
    passport: createFieldProps('passport', {
      required: true,
      onChange: useCallback(handleFileChange('passport'), []), // eslint-disable-line react-hooks/exhaustive-deps
      value: watch('passport'),
      triggerValidation
    }),
    utilityBill: createFieldProps('utilityBill', {
      required: true,
      onChange: useCallback(handleFileChange('utilityBill'), []), // eslint-disable-line react-hooks/exhaustive-deps
      value: watch('utilityBill'),
      triggerValidation
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
    idNumber: yup.string().required('This field is required'),
    passport: yup.mixed().required('This field is required'),
    utilityBill: yup.mixed().required('This field is required'),
  })
