import React, { useMemo, useCallback, useState, useEffect } from 'react'
import {
  Grid,
  Card,
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { Controller, useForm } from 'react-hook-form'

import { editDsoSchema } from 'pages/invest/helpers/schema'
import {
  useInvestState,
  useInvestDispatch,
  INVEST_STATUS,
  saveDso,
  getDso
} from 'context/InvestContext'

import { useHistory } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import { mapObjIndexed, curry } from 'ramda'
import { useRef } from 'react'

export default function DsoEdit () {
  const {
    handleSubmit,
    fields,
    isValid,
    error,
    snackbarError,
    handleSnackbarErrorClose,
    isReady,
    isSaving
  } = useDsoEditLogic()

  return (
    <Grid component='article' container justify='center' spacing={3}>
      <Grid item xs={12} sm={10} md={8}>
        {error ? (
          // error
          <Alert severity='error'>{error}</Alert>
        ) : !isReady ? (
          // loading
          <Card>
            <Box p={3} display='flex' justifyContent='center'>
              <CircularProgress size={48} />
            </Box>
          </Card>
        ) : (
          // form
          <Card component='form' onSubmit={handleSubmit}>
            <Box p={3}>
              <Typography component='h1' variant='h3'>
                Edit Dso
              </Typography>

              {/* Names Row */}
              <Box component='section' mt={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      as={TextField}
                      fullWidth
                      margin='dense'
                      label='Title of Dso'
                      {...fields.title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      as={TextField}
                      fullWidth
                      margin='dense'
                      label='Current Status of DSO'
                      {...fields.status}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      as={TextField}
                      fullWidth
                      margin='dense'
                      label='Summary'
                      {...fields.summary}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box component='section'>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <SelectGroup
                      label='Status'
                      {...['Upcoming', 'Live', 'Complete']}
                    />

                    <SelectGroup
                      label='Funding Currency'
                      {...['Singapore Dollar', 'US Dollar']}
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
                      label='Capital Structure'
                      {...['Equity', 'Debt']}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        )}

        {/* Error Snackbar - For saveAccreditation() errors */}
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

const useDsoEditLogic = () => {
  const id = useDsoState()
  const idDispatch = useDsoDispatch()

  const [snackbarError, setSnackbarError] = useState('')

  const validationSchema = useMemo(editDsoSchema, [])

  const methods = useForm({ validationSchema })

  const {
    handleSubmit: rhfHandleSubmit,
    errors,
    control,
    setValue,
    formState,
    watch,
    triggerValidation,
    register,
    getValues
  } = methods

  const isValid = formState.isSubmitted ? formState.isValid : true
  const history = useHistory()
  const initialDataRef = useRef()
  const [isSaving, setIsSaving] = useState(false)

  const isIdReady = ![IDENTITY_STATUS.INIT, IDENTITY_STATUS.GETTING].includes(
    id.status
  )

  const isReady = isIdReady

  const error = id.error.get || acrd.error.get

  const handleSnackbarErrorClose = useCallback(() => setSnackbarError(''), [])

  // initial render tasks
  useEffect(() => {
    // register file inputs
    register({ name: 'idFile' })
    register({ name: 'utilityBillFile' })
    register({ name: 'proofOfWealth' })

    // fetch identity data for initial values
    if (id.status === IDENTITY_STATUS.INIT) {
      getDso(idDispatch, dsoId).catch(() => {})
    }
  }, [])

  // load values from state
  const isIdDataPresent =
    typeof id.identity === 'object' && Object.keys(id.identity).length
  const isAcrdDataPresent =
    typeof acrd.accreditation === 'object' &&
    Object.keys(acrd.accreditation).length
  const isDataPresent = isIdDataPresent && isAcrdDataPresent

  useEffect(() => {
    if (!isDataPresent) return
    const masterData = { ...id.identity, ...acrd.accreditation }

    Object.keys(fields).forEach(fieldName => {
      let valueFromState

      // Handle loading boolean values to be cast to string
      if (DATE_KEYS.includes(fieldName)) {
        const rawValue = masterData[fieldName]

        if (typeof rawValue === 'string') {
          valueFromState = new Date(rawValue)
        }

        // Handle loading address values to be loaded from sub object
      } else if (ADDRESS_KEYS.includes(fieldName)) {
        valueFromState = masterData.address[fieldName]

        // Handle loading file inputs
      } else if (FILES_KEYS.includes(fieldName)) {
        valueFromState = selectFile(id, FILE_KEYS_TO_TITLE[fieldName])

        // Handle loading boolean values to be cast to string
      } else if (BOOLEAN_KEYS.includes(fieldName)) {
        const rawValue = masterData[fieldName]

        if (typeof rawValue === 'boolean') {
          valueFromState = rawValue ? 'true' : 'false'
        }

        // Handle loading accreditation details (also boolean values to be cast to string)
      } else {
        valueFromState = masterData[fieldName]
      }

      if (!valueFromState) return
      setValue(fieldName, valueFromState)
    })

    initialDataRef.current = getValues()
  }, [isDataPresent]) // eslint-disable-line react-hooks/exhaustive-deps

  // saves all updated data group and files on form submit
  const handleSubmit = rhfHandleSubmit(async formData => {
    const initialData = initialDataRef.current
    setIsSaving(true)

    Promise.all([
      checkIsIdentityDirty(initialData, formData)
        ? saveIdentity(idDispatch, extractIdFromFormData(formData))
        : Promise.resolve(),
      ...saveChangedFiles(idDispatch, formData)
    ])
      // .then(() => history.push('/app/identity'))
      .catch(e => {
        setSnackbarError(e.message || e.toString())
        setIsSaving(false)
      })
  })

  // handle file change
  const handleFileChange = name => files => setValue(name, files)

  // create fields
  const createFieldProps = (key, overrides) => ({
    name: key,
    error: Boolean(errors[key] && errors[key].message),
    helperText: (errors[key] && errors[key].message) || '',
    defaultValue: '',
    control,
    ...overrides
  })

  const fields = {
    // basic identity fields
    title: createFieldProps('title', { required: true }),
    status: createFieldProps('status', {
      options: ['Upcoming', 'Complete', 'Live'],
      required: true
    }),
    summary: createFieldProps('summary'),
    highlights: createFieldProps('highlights'),
    businessModel: createFieldProps('businessModel'),
    milestones: createFieldProps('milestones'),
    roadmap: createFieldProps('roadmap'),
    existingClients: createFieldProps('existingClients'),
    fundingCurrency: createFieldProps('fundingCurrency'),
    minimumInvestment: createFieldProps('minimumInvestment', {
      required: true
    }),
    investmentTerms: createFieldProps('investmentTerms'),
    fundingGoal: createFieldProps('fundingGoal'),
    dealStructure: createFieldProps('dealStructure'),
    capitalStructure: createFieldProps('capitalStructure'),
    holdingStructure: createFieldProps('holdingStructure'),
    smartContractAddress: createFieldProps('smartContractAddress'),
    team: createFieldProps('team')
  }

  return {
    status,
    handleSubmit,
    fields,
    methods,
    isValid,
    error,
    snackbarError,
    handleSnackbarErrorClose,
    isReady,
    isSaving
  }
}

const DSO_KEYS = [
  'title',
  'status',
  'summary',
  'highlights',
  'milestones',
  'existingClients',
  'fundingCurrency',
  'minimumInvestment',
  'investmentTerms',
  'fundingGoal',
  'dealStructure',
  'capitalStructure',
  'holdingStructure',
  'smartContractAddress',
  'team'
]

const checkIsDsoDirty = (initialData, currentData) =>
  DSO_KEYS.some(k => initialData[k] !== currentData[k])

const extractPropsFromObj = curry((keys, obj) =>
  keys.reduce(
    (acc, k) =>
      obj[k] !== undefined && obj[k] !== null ? { ...acc, [k]: obj[k] } : acc,
    {}
  )
)

const extractDSOFromFormData = extractPropsFromObj(DSO_KEYS)

const castStrToBool = str => str === 'true'
