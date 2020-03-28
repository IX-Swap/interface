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
  IDENTITY_STATUS,
  saveFile,
  saveIdentity
} from 'context/IdentityContext'
import { useForm, Controller } from 'react-hook-form'
import IdentityProgress from 'pages/identity/components/IdentityProgress'
import { useMemo } from 'react'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import UploadSection from 'pages/identity/components/UploadSection'
import { useHistory } from 'react-router-dom'
import { pick } from 'ramda'
import { createIDDocumentsSchema } from 'pages/identity/helpers/schema'

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
            <Typography component='h1' variant='h3' align='center'>
              Identification
            </Typography>

            <Box mt={3} mx={-3}>
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
                    label='ID Photo'
                    emptyLabel='Please upload a photo or scan or your passport.'
                    {...fields.idFile}
                  />

                  <Box mt={1}>
                    <Controller
                      as={TextField}
                      fullWidth
                      width='100%'
                      margin='dense'
                      label='ID Type'
                      {...fields.idType}
                      helperText={
                        fields.idType.error
                          ? fields.idType.helperText
                          : 'Please type in your ID type.'
                      }
                    />

                    <Controller
                      as={TextField}
                      fullWidth
                      width='100%'
                      margin='dense'
                      label='ID No.'
                      {...fields.idNumber}
                      helperText={
                        fields.idNumber.error
                          ? fields.idNumber.helperText
                          : 'Please type in your ID no.'
                      }
                    />

                    <Box mt={6}>
                      <UploadSection
                        label='Utility Bill'
                        emptyLabel='Please upload a photo or scan of a recent utility bill.'
                        {...fields.utilityBillFile}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box display='flex' justifyContent='flex-end' mt={6}>
                  <Button
                    disabled={!isValid || status !== 'IDLE'}
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    {status === 'SAVING' ? 'Saving...' : 'Upload & Finish'}
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
  const { status, identity, error, shouldCreateNew } = useIdentityState()
  const [snackbarError, setSnackbarError] = useState('')
  const idDispatch = useIdentityDispatch()
  const validationSchema = useMemo(createIDDocumentsSchema, [])
  const methods = useForm({ validationSchema })
  const history = useHistory()

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

  useEffect(() => {
    // register file inputs
    register({ name: 'idFile' })
    register({ name: 'utilityBillFile' })

    // fetch identity data for initial values
    if (status === IDENTITY_STATUS.INIT) {
      getIdentity(idDispatch).catch(() => {})
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // saves identity data for on form submit
  const handleSubmit = rhfHandleSubmit(async formData => {
    try {
      const { firstName, address, _id } = identity
      const { idNumber, idFile, utilityBillFile, idType } = formData

      await saveFile(idDispatch, {
        title: 'Passport',
        file: idFile[0],
        remarks: idNumber,
        type: 'individual',
        id: _id
      })

      await saveFile(idDispatch, {
        title: 'Utility Bill',
        file: utilityBillFile[0],
        remarks: '',
        type: 'individual',
        id: _id
      })

      const newIdentity = {
        idType,
        idNumber,
        firstName,
        ...filterIllegalAddressKeys(address), // need to reinclude Address otherwise it will be deleted
        type: 'individual',
        id: _id
      }

      await saveIdentity(idDispatch, newIdentity, shouldCreateNew)

      history.push('/app/identity/financials-steps/1')
    } catch (e) {
      setSnackbarError(e.message || e.toString())
    }
  })

  const createFieldProps = (key, overrides) => ({
    name: key,
    error: Boolean(errors[key] && errors[key].message),
    helperText: (errors[key] && errors[key].message) || '',
    defaultValue: '',
    control,
    ...overrides
  })

  const handleFileChange = name => files => setValue(name, files)
  const fields = {
    idType: createFieldProps('idType', { required: true }),
    idNumber: createFieldProps('idNumber', { required: true }),
    idFile: createFieldProps('idFile', {
      required: true,
      onChange: useCallback(handleFileChange('idFile'), []), // eslint-disable-line react-hooks/exhaustive-deps
      value: watch('idFile'),
      triggerValidation
    }),
    utilityBillFile: createFieldProps('utilityBillFile', {
      required: true,
      onChange: useCallback(handleFileChange('utilityBillFile'), []), // eslint-disable-line react-hooks/exhaustive-deps
      value: watch('utilityBillFile'),
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

const ADDRESS_KEYS = [
  'unit',
  'line1',
  'line2',
  'city',
  'postalCode',
  'state',
  'country'
]
const filterIllegalAddressKeys = pick(ADDRESS_KEYS)
