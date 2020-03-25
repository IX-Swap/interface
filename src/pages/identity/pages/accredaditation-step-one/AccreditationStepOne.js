import React, { useEffect, useState, useCallback } from 'react'
import { Grid, Card, Typography, Box, Button, CircularProgress, Snackbar, IconButton } from '@material-ui/core'
import { useAccreditationState, useAccreditationDispatch, getAccreditation, saveAccreditation, ACCREDITATION_STATUS } from 'context/AccreditationContext'
import { useForm, } from 'react-hook-form'
import AccreditationProgress from 'pages/identity/components/AccreditationProgress'
import * as yup from 'yup'
import { useMemo } from 'react'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'
import SelectGroup from 'pages/identity/components/SelectGroup'

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
              <AccreditationProgress activeStep={0} />
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
                  <Typography>Are you an accredited investor?</Typography>

                  {/* Inputs Column */}
                  <Box maxWidth='12rem'>
                    <SelectGroup fullWidth label='Select Yes or No' {...fields.selfAccreditedInvestor} />
                  </Box>
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
  const { status, accreditation, error } = useAccreditationState()
  const [snackbarError, setSnackbarError] = useState('')
  const idDispatch = useAccreditationDispatch()
  const validationSchema = useMemo(createSchema, [])
  const methods = useForm({ validationSchema })
  const { handleSubmit: rhfHandleSubmit, errors, control, setValue, formState } = methods
  const isValid = formState.isSubmitted ? formState.isValid : true
  const history = useHistory()

  const handleSnackbarErrorClose = useCallback(() => setSnackbarError(''), [])

  // load accreditation data to form when it updates from reducer
  useEffect(() => {
    const isLoadedDataEmpty = !accreditation || !Object.keys(accreditation).length
    const isSelfAccreditedInvestorDefined = typeof accreditation?.selfAccreditedInvestor === 'boolean'

    if (isLoadedDataEmpty || !isSelfAccreditedInvestorDefined) return

    const selfAccreditedInvestor = accreditation.selfAccreditedInvestor ? 'true' : 'false'
    setValue('selfAccreditedInvestor', selfAccreditedInvestor)
  }, [accreditation]) // eslint-disable-line react-hooks/exhaustive-deps

  // fetch accreditation data for initial values
  useEffect(() => {
    if (status === ACCREDITATION_STATUS.INIT) {
      getAccreditation(idDispatch).catch(() => {})
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // saves accreditation data on form submit
  const handleSubmit = rhfHandleSubmit(formData => {
    const newAccreditation = {
      selfAccreditedInvestor: formData.selfAccreditedInvestor === 'true',
      accreditationDetails: {} // API throws error without this
    }

    saveAccreditation(idDispatch, newAccreditation)
      .then(() => history.push('/app/identity/accreditation-steps/2'))
      .catch(e => setSnackbarError(e.message || e.toString()))
  })

  // create the field props
  const createFieldProps = (key, overrides) =>
    ({
      name: key,
      error: Boolean(errors[key] && errors[key].message),
      helperText: (errors[key] && errors[key].message) || '',
      control,
      defaultValue: '',
      ...overrides
    })

  const fields = {
    selfAccreditedInvestor: createFieldProps('selfAccreditedInvestor', {
      options: YES_OR_NO_OPTS,
      required: true,
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

const YES_OR_NO_OPTS = [{ value: 'true', label: 'Yes'}, { value: 'false', label: 'No'}]

// Create the form schema
const createSchema = () =>
  yup.object().shape({
    selfAccreditedInvestor: yup.mixed().oneOf(['true', 'false'], 'This field is required'),
  })
