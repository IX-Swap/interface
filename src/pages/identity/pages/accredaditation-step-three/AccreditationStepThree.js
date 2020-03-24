import React, { useEffect, useState, useCallback } from 'react'
import { Grid, Card, Typography, Box, Button, CircularProgress, Snackbar, IconButton } from '@material-ui/core'
import { useAccreditationState, useAccreditationDispatch, getAccreditation, ACCREDITATION_STATUS } from 'context/AccreditationContext'
import { useForm, } from 'react-hook-form'
import AccreditationProgress from 'pages/identity/components/AccreditationProgress'
import * as yup from 'yup'
import { useMemo } from 'react'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import UploadSection from 'pages/identity/components/UploadSection'

export default function AccreditationStepOne () {
  const {
    status,
    handleSubmit,
    fields,
    isValid,
    error,
    snackbarError,
    handleSnackbarErrorClose
  } = useAccreditationFormLogic()

  return (
    <Grid component='article' container justify='center' spacing={3}>
      <Grid item xs={12} sm={10} md={8}>
        {/* Form */}
        <Card component='form' onSubmit={handleSubmit} noValidate>
          <Box p={3}>
            <Typography component='h1' variant='h3' align='center'>Accreditation</Typography>

            {/* Progress Section */}
            <Box mt={3} mx={-3}>
              <AccreditationProgress activeStep={2} />
            </Box>

            {['INIT', 'GETTING'].includes(status) ? (
              /* Loader */
              <Box p={3} display='flex' justifyContent='center'>
                <CircularProgress size={48} />
              </Box>
            ) : error.get ? (
              /* Error alert - For getAccreditation() errors */
              <Alert severity='error'>{error.get}</Alert>
            ) : (
              /* Form */
              <>
                <Box mx='auto' mt={4} maxWidth='32rem'>
                  <UploadSection
                    label='Proof of Wealth'
                    emptyLabel='Upload a photo or scan of a bank statement or proof of wealth.'
                    {...fields.proofOfWealth}
                  />
                </Box>

                {/* Submit Button */}
                <Box display='flex' justifyContent='flex-end' mt={6}>
                  <Button disabled={!isValid || status !== 'IDLE'} type='submit' variant='contained' color='primary'>
                    {status === 'SAVING'
                      ? 'Saving...'
                      : 'Save & Upload'}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Card>

        {/* Error Snackbar - For saveAccreditation() errors */}
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

const useAccreditationFormLogic = () => {
  const { status, error } = useAccreditationState()
  const [snackbarError, setSnackbarError] = useState('')
  const idDispatch = useAccreditationDispatch()
  const validationSchema = useMemo(createSchema, [])
  const methods = useForm({ validationSchema })
  const { handleSubmit: rhfHandleSubmit, errors, control, setValue, formState, watch, triggerValidation, register } = methods
  const isValid = formState.isSubmitted ? formState.isValid : true

  const handleSnackbarErrorClose = useCallback(() => setSnackbarError(''), [])

  useEffect(() => {
    // register file inputs
    register({ name: 'proofOfWealth' })

  // fetch accreditation data for initial values
    if (status === ACCREDITATION_STATUS.INIT) {
      getAccreditation(idDispatch).catch(() => {})
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // saves accreditation data on form submit
  const handleSubmit = rhfHandleSubmit(formData => {
    alert('formData: ' + JSON.stringify(formData))
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

  const handleFileChange = name => files => setValue(name, files)
  const fields = {
    proofOfWealth: createFieldProps('proofOfWealth', {
      required: true,
      onChange: useCallback(handleFileChange('proofOfWealth'), []), // eslint-disable-line react-hooks/exhaustive-deps
      value: watch('proofOfWealth'),
      triggerValidation
    }),
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
    proofOfWealth: yup.mixed().required('This field is required'),
  })
