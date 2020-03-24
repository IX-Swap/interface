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
              <AccreditationProgress activeStep={1} />
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
                  {[[
                    'Does your total personal asset exceed S$2,000,000?',
                    fields.totalPersonalAssetExceedsTwoMillionSGD
                  ],
                  [
                    'Is your last income in the last 12 months greater than S$300,000?',
                    fields.lastTwelveMonthIncomeGreatherThanThreeHundredThousands
                  ],
                  [
                    'Does your personal financial assets exceed S$1,000,000?',
                    fields.personalFinancialAssetsExceedsOneMillion
                  ],
                  [
                    'Do you have any jointly held in any of the above?',
                    fields.jointlyHeldAccountMeetingAnyAbove
                  ]].map(([label, field], i) =>
                    <Box mt={i === 0 ? 0 : 4} key={i}>
                      <Typography>{label}</Typography>
                      <Box maxWidth='12rem' mt={-1}>
                        <SelectGroup displayEmpty margin='none' fullWidth label='' {...field} />
                      </Box>
                    </Box>
                    )}
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
    const accreditationDetails = accreditation?.accreditationDetails
    const isLoadedDataEmpty = !accreditationDetails
      || !Object.keys(accreditationDetails).length
    if (isLoadedDataEmpty) return

    Object.keys(fields)
      .forEach(fieldName => {
        const loadedFieldValue = accreditationDetails[fieldName]
        if (typeof loadedFieldValue !== 'boolean') return
        setValue(fieldName, loadedFieldValue ? 'true' : 'false')
      })
  }, [accreditation]) // eslint-disable-line react-hooks/exhaustive-deps

  // fetch accreditation data for initial values
  useEffect(() => {
    if (status === ACCREDITATION_STATUS.INIT) {
      getAccreditation(idDispatch).catch(() => {})
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // saves accreditation data on form submit
  const handleSubmit = rhfHandleSubmit(formData => {
    const accreditationDetails =
      Object.fromEntries(
        Object.entries(formData)
          .map(([key, value]) => [key, value === 'true']))

    const newAccreditation = { accreditationDetails }
    saveAccreditation(idDispatch, newAccreditation)
      .then(() => history.push('/app/identity/accreditation-steps/3'))
      .catch(e => setSnackbarError(e.message || e.toString()))
  })

  // create the field props
  const createFieldProps = key =>
    ({
      name: key,
      error: Boolean(errors[key] && errors[key].message),
      helperText: (errors[key] && errors[key].message) || '',
      control,
      defaultValue: '',
      options: YES_OR_NO_OPTS
    })

  const fields = {
    totalPersonalAssetExceedsTwoMillionSGD:
      createFieldProps('totalPersonalAssetExceedsTwoMillionSGD'),
    lastTwelveMonthIncomeGreatherThanThreeHundredThousands:
      createFieldProps('lastTwelveMonthIncomeGreatherThanThreeHundredThousands'),
    personalFinancialAssetsExceedsOneMillion:
      createFieldProps('personalFinancialAssetsExceedsOneMillion'),
    jointlyHeldAccountMeetingAnyAbove:
      createFieldProps('jointlyHeldAccountMeetingAnyAbove')
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

const YES_OR_NO_OPTS = [
  { value: 'true', label: 'Yes'},
  { value: 'false', label: 'No'},
  { value: '', label: 'Select Yes or No'}
]

// Create the form schema
const TRUE_OR_FALSE_YUP = yup.mixed().oneOf(['true', 'false'], 'This field is required')
const createSchema = () =>
  yup.object().shape({
    totalPersonalAssetExceedsTwoMillionSGD: TRUE_OR_FALSE_YUP,
    lastTwelveMonthIncomeGreatherThanThreeHundredThousands: TRUE_OR_FALSE_YUP,
    personalFinancialAssetsExceedsOneMillion: TRUE_OR_FALSE_YUP,
    jointlyHeldAccountMeetingAnyAbove: TRUE_OR_FALSE_YUP
  })
