import React, { useEffect, useState, useCallback } from 'react'
import { Grid, Card, TextField, Typography, Box, Button, CircularProgress, Snackbar, IconButton } from '@material-ui/core'
import { useIdentityState, useIdentityDispatch, getIdentity, saveFinancials, IDENTITY_STATUS } from 'context/IdentityContext'
import { useForm, Controller } from 'react-hook-form'
import FinancialsProgress from 'pages/identity/components/FinancialsProgress'
import * as yup from 'yup'
import { useMemo } from 'react'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'

export default function FinancialsStepTwo () {
  const {
    status,
    handleSubmit,
    fields,
    isValid,
    error,
    snackbarError,
    handleSnackbarErrorClose
  } = useFinancialsFormLogic()

  return (
    <Grid component='article' container justify='center' spacing={3}>
      <Grid item xs={12} sm={10} md={8}>
        {/* Form */}
        <Card component='form' onSubmit={handleSubmit} noValidate>
          <Box p={3}>
            <Typography component='h1' variant='h3' align='center'>Financials</Typography>

            {/* Progress Section */}
            <Box mt={3}>
              <FinancialsProgress activeStep={1} />
            </Box>

            {['INIT', 'GETTING'].includes(status) ? (
              /* Loader */
              <Box p={3} display='flex' justifyContent='center'>
                <CircularProgress size={48} />
              </Box>
            ) : error.get ? (
              /* Error alert - For getIdentity() errors */
              <Alert severity='error'>{error.get}</Alert>
            ) : (
              /* Form */
              <>
                <Box mx='auto' mt={4} maxWidth='32rem'>
                  {/* Inputs Column */}
                  <Controller as={TextField} fullWidth margin='dense' label='Bank Name' {...fields.bankName} />
                  <Controller as={TextField} fullWidth margin='dense' label='Bank Account Name' {...fields.bankAccountName} />
                  <Controller as={TextField} fullWidth margin='dense' label='Bank Account Number' {...fields.bankAccountNumber} />
                </Box>

                {/* Submit Button */}
                <Box display='flex' justifyContent='flex-end' mt={6}>
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

        {/* Error Snackbar - For saveFinancials() errors */}
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

const useFinancialsFormLogic = () => {
  const { status, identity, error } = useIdentityState()
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
        const loadedFieldValue = identity[fieldName]
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

  // saves identity data on form submit
  const handleSubmit = rhfHandleSubmit(newFinancials => {
    saveFinancials(idDispatch, newFinancials)
      .then(() => history.push('/app/identity/financials-steps/3'))
      .catch(e => setSnackbarError(e.message || e.toString()))
  })

  // create the field props
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
    bankName: createFieldProps('bankName', { required: true }),
    bankAccountName: createFieldProps('bankAccountName', { required: true }),
    bankAccountNumber: createFieldProps('bankAccountNumber', { required: true }),
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

// Create the form schema
const createSchema = () =>
  yup.object().shape({
    bankName: yup.string().required('This field is required'),
    bankAccountName: yup.string().required('This field is required'),
    bankAccountNumber: yup.string().required('This field is required'),
  })
