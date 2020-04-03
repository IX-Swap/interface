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
import SelectGroup from 'pages/identity/components/SelectGroup/SelectGroup'
import createDate18YearsAgo from 'pages/identity/helpers/createDate18YearsAgo'
import { DatePicker } from '@material-ui/pickers'
import createDate18YearsAndADayAgo from 'pages/identity/helpers/createDate18YearsAndADayAgo'
import {
  MARITAL_STATUSES_OPTS,
  GENDERS_OPTS,
  COUNTRIES_OPTS,
  YES_OR_NO_OPTS
} from 'const'
import { createIndividualSchema } from 'pages/identity/helpers/schema'
import UploadSection from 'pages/identity/components/UploadSection/UploadSection'
import SingleCheckbox from 'pages/identity/components/SingleCheckbox'
import {
  useAccreditationState,
  useAccreditationDispatch,
  ACCREDITATION_STATUS,
  getAccreditation,
  saveAccreditation
} from 'context/AccreditationContext'
import {
  useIdentityState,
  useIdentityDispatch,
  IDENTITY_STATUS,
  getIdentity,
  saveIdentity,
  saveFinancials,
  saveFile
} from 'context/IdentityContext'
import { useHistory } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import { mapObjIndexed, curry } from 'ramda'
import { useRef } from 'react'

export default function UpdateIdentity (props) {
  const {
    handleSubmit,
    fields,
    error,
    snackbarError,
    handleSnackbarErrorClose,
    isReady,
    isSaving
  } = useUpdateIdentityLogic()

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
                Update My Identity
              </Typography>
              <Box display='flex' justifyContent='flex-end' mt={0}>
                <Box mr={2}>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => props.history.push('/app/identity')}
                  >
                    Cancel
                  </Button>
                </Box>
                <Box>
                  <Button
                    disabled={isSaving}
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              </Box>
              {/* Names Row */}
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

              {/* Gender, Contact No., DOB and Nationality */}
              <Box component='section'>
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
                    <SelectGroup label='Nationality' {...fields.nationality} />
                  </Grid>
                </Grid>
              </Box>

              {/* Address fields */}
              <Box component='section' mt={8}>
                <Box mb={1}>
                  <Typography component='h2' variant='h5'>
                    Address
                  </Typography>
                </Box>

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

              {/* Documents */}
              <Box component='section' mt={8}>
                <Box mb={1}>
                  <Typography component='h2' variant='h5'>
                    Documents
                  </Typography>
                </Box>

                <UploadSection
                  label='ID Photo'
                  emptyLabel='Please upload a photo or scan or your passport.'
                  {...fields.idFile}
                />

                <Box mt={1}>
                  <UploadSection
                    label='Utility Bill'
                    emptyLabel='Please upload a photo or scan of a recent utility bill.'
                    {...fields.utilityBillFile}
                  />
                </Box>
              </Box>

              {/* Financials */}
              <Box component='section' mt={8}>
                <Box mb={1}>
                  <Typography component='h2' variant='h5'>
                    Occupation
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  {/* Inputs First Column */}
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
                      label='Occupation'
                      {...fields.occupation}
                    />
                    <Controller
                      as={TextField}
                      fullWidth
                      margin='dense'
                      label='Employment Status'
                      {...fields.employmentStatus}
                    />
                  </Grid>

                  {/* Inputs Second Column */}
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
                      label='Employer'
                      {...fields.employer}
                    />
                    <Controller
                      as={TextField}
                      fullWidth
                      margin='dense'
                      label='Industry Of Employment'
                      {...fields.industryOfEmployment}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Bank Account Fields */}
              <Box component='section' mt={8}>
                <Typography component='h2' variant='h5'>
                  Bank Account
                </Typography>

                {/* Inputs Column */}
                <Controller
                  as={TextField}
                  fullWidth
                  margin='dense'
                  label='Bank Name'
                  {...fields.bankName}
                />
                <Controller
                  as={TextField}
                  fullWidth
                  margin='dense'
                  label='Bank Account Name'
                  {...fields.bankAccountName}
                />
                <Controller
                  as={TextField}
                  fullWidth
                  margin='dense'
                  label='Bank Account Number'
                  {...fields.bankAccountNumber}
                />
              </Box>

              {/* Income Fields */}
              <Box component='section' mt={6}>
                <Typography component='h2' variant='h5'>
                  Income
                </Typography>

                <Controller
                  as={TextField}
                  fullWidth
                  margin='dense'
                  label='Annual Income'
                  {...fields.annualIncome}
                />
                <Controller
                  as={TextField}
                  fullWidth
                  margin='dense'
                  label='Household Income'
                  {...fields.houseHoldIncome}
                />
                <Controller
                  as={TextField}
                  fullWidth
                  margin='dense'
                  label='Source Of Wealth'
                  {...fields.sourceOfWealth}
                />
                <SingleCheckbox
                  color='primary'
                  inputProps={{ 'aria-label': 'Politically Exposed' }}
                  label='Politically Exposed'
                  {...fields.politicallyExposed}
                />
              </Box>

              {/* Self-Accredited Investor */}
              <Box component='section' mt={6}>
                <Typography component='h2' variant='h5'>
                  Self-Accredited Investor
                </Typography>

                <Box mt={1}>
                  <Typography>Are you an accredited investor?</Typography>
                  <Box maxWidth='12rem'>
                    <SelectGroup
                      displayEmpty
                      margin='none'
                      fullWidth
                      label=''
                      {...fields.selfAccreditedInvestor}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Declarations */}
              <Box component='section' mt={6}>
                <Typography component='h2' variant='h5'>
                  Declarations
                </Typography>

                {[
                  [
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
                  ]
                ].map(([label, field], i) => (
                  <Box mt={i === 0 ? 1 : 4} key={i}>
                    <Typography>{label}</Typography>
                    <Box maxWidth='12rem'>
                      <SelectGroup
                        displayEmpty
                        margin='none'
                        fullWidth
                        label=''
                        {...field}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Proof of wealth Field */}
              <Box component='section' mt={6}>
                <Box mb={1}>
                  <Typography component='h2' variant='h5'>
                    Proof of wealth
                  </Typography>
                </Box>
                <UploadSection
                  label='Proof of Wealth'
                  emptyLabel='Upload a photo or scan of a bank statement or proof of wealth.'
                  {...fields.proofOfWealth}
                />
              </Box>

              {/* Submit Button */}
              <Box display='flex' justifyContent='flex-end' mt={8}>
                <Box m={2}>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => props.history.push('/app/identity')}
                  >
                    Cancel
                  </Button>
                </Box>
                <Box m={2}>
                  <Button
                    disabled={isSaving}
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
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

const useUpdateIdentityLogic = () => {
  const acrd = useAccreditationState()
  const id = useIdentityState()
  const idDispatch = useIdentityDispatch()
  const acrdDispatch = useAccreditationDispatch()
  const { status } = acrd
  const [snackbarError, setSnackbarError] = useState('')
  const validationSchema = useMemo(createIndividualSchema, [])
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
  const isAcrdReady = ![
    ACCREDITATION_STATUS.INIT,
    ACCREDITATION_STATUS.GETTING
  ].includes(acrd.status)
  const isReady = isIdReady && isAcrdReady

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
      getIdentity(idDispatch).catch(() => {})
    }

    // fetch accreditation data for initial values
    if (acrd.status === ACCREDITATION_STATUS.INIT) {
      getAccreditation(acrdDispatch).catch(() => {})
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
        // } else if (FILES_KEYS.includes(fieldName)) {
        //   valueFromState = selectFile(id, FILE_KEYS_TO_TITLE[fieldName])

        // Handle loading boolean values to be cast to string
      } else if (BOOLEAN_KEYS.includes(fieldName)) {
        const rawValue = masterData[fieldName]

        if (typeof rawValue === 'boolean') {
          valueFromState = rawValue ? 'true' : 'false'
        }

        // Handle loading accreditation details (also boolean values to be cast to string)
      } else if (ACRD_DETAILS_BOOLEAN_KEYS.includes(fieldName)) {
        const rawValue = masterData.accreditationDetails[fieldName]

        if (typeof rawValue === 'boolean') {
          valueFromState = rawValue ? 'true' : 'false'
        }

        // Handle loading simple values
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
        ? saveIdentity(idDispatch, {
            ...extractIdFromFormData(formData),
            type: 'individual',
            id: id.identity._id
          })
        : Promise.resolve(),
      checkIsFinancialsDirty(initialData, formData)
        ? saveFinancials(idDispatch, extractFinancialsFromFormData(formData))
        : Promise.resolve(),
      checkIsAcrdDirty(initialData, formData)
        ? saveAccreditation(acrdDispatch, extractAcrdFromFormData(formData))
        : Promise.resolve(),
      ...saveChangedFiles(idDispatch, formData, id.identity._id)
    ])
      .then(() => history.push('/app/identity'))
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
    firstName: createFieldProps('firstName'),
    middleName: createFieldProps('middleName'),
    lastName: createFieldProps('lastName'),
    contactNumber: createFieldProps('contactNumber'),
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
    }),

    // address fields
    unit: createFieldProps('unit'),
    line1: createFieldProps('line1'),
    line2: createFieldProps('line2'),
    city: createFieldProps('city'),
    postalCode: createFieldProps('postalCode'),
    state: createFieldProps('state'),
    country: createFieldProps('country', {
      options: COUNTRIES_OPTS,
      required: true
    }),
    countryOfResidence: createFieldProps('countryOfResidence', {
      options: COUNTRIES_OPTS,
      required: true
    }),

    // documents fields
    idNumber: createFieldProps('idNumber'),
    idFile: createFieldProps('idFile', {
      onChange: useCallback(handleFileChange('idFile'), []), // eslint-disable-line react-hooks/exhaustive-deps
      value: watch('idFile'),
      triggerValidation,
      required: false
    }),
    utilityBillFile: createFieldProps('utilityBillFile', {
      onChange: useCallback(handleFileChange('utilityBillFile'), []), // eslint-disable-line react-hooks/exhaustive-deps
      value: watch('utilityBillFile'),
      triggerValidation,
      required: false
    }),

    // occupation fields
    occupation: createFieldProps('occupation'),
    employmentStatus: createFieldProps('employmentStatus'),
    employer: createFieldProps('employer'),
    industryOfEmployment: createFieldProps('industryOfEmployment', {
      required: true
    }),

    // bank account fields
    bankName: createFieldProps('bankName'),
    bankAccountName: createFieldProps('bankAccountName'),
    bankAccountNumber: createFieldProps('bankAccountNumber'),

    // income fields
    annualIncome: createFieldProps('annualIncome'),
    houseHoldIncome: createFieldProps('houseHoldIncome'),
    sourceOfWealth: createFieldProps('sourceOfWealth'),
    politicallyExposed: createFieldProps('politicallyExposed', {
      defaultValue: false
    }),

    // self accreditated investor fields
    selfAccreditedInvestor: createFieldProps('selfAccreditedInvestor', {
      options: YES_OR_NO_OPTS,
      required: true
    }),

    // accreditation info fields
    totalPersonalAssetExceedsTwoMillionSGD: createFieldProps(
      'totalPersonalAssetExceedsTwoMillionSGD',
      {
        options: YES_OR_NO_OPTS
      }
    ),
    lastTwelveMonthIncomeGreatherThanThreeHundredThousands: createFieldProps(
      'lastTwelveMonthIncomeGreatherThanThreeHundredThousands',
      {
        options: YES_OR_NO_OPTS
      }
    ),
    personalFinancialAssetsExceedsOneMillion: createFieldProps(
      'personalFinancialAssetsExceedsOneMillion',
      {
        options: YES_OR_NO_OPTS
      }
    ),
    jointlyHeldAccountMeetingAnyAbove: createFieldProps(
      'jointlyHeldAccountMeetingAnyAbove',
      {
        options: YES_OR_NO_OPTS,
        required: true
      }
    ),

    // proof of wealth field
    proofOfWealth: createFieldProps('proofOfWealth', {
      onChange: useCallback(handleFileChange('proofOfWealth'), []), // eslint-disable-line react-hooks/exhaustive-deps
      value: watch('proofOfWealth'),
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
    handleSnackbarErrorClose,
    isReady,
    isSaving
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

const FILES_KEYS = ['idFile', 'utilityBillFile', 'proofOfWealth']

const FILE_KEYS_TO_TITLE = {
  idFile: 'Passport',
  utilityBillFile: 'Utility Bill',
  proofOfWealth: 'Proof of Wealth'
}

const BOOLEAN_KEYS = ['selfAccreditedInvestor']

const ACRD_DETAILS_BOOLEAN_KEYS = [
  'totalPersonalAssetExceedsTwoMillionSGD',
  'lastTwelveMonthIncomeGreatherThanThreeHundredThousands',
  'personalFinancialAssetsExceedsOneMillion',
  'jointlyHeldAccountMeetingAnyAbove'
]

const ACRD_BOOLEAN_KEYS = ['selfAccreditedInvestor']

const ID_KEYS = [
  'firstName',
  'middleName',
  'lastName',
  'contactNumber',
  'dob',
  'maritalStatus',
  'gender',
  'nationality',
  'unit',
  'line1',
  'line2',
  'city',
  'postalCode',
  'state',
  'country',
  'countryOfResidence',
  'idNumber'
]

const FINANCIALS_KEYS = [
  'occupation',
  'employmentStatus',
  'employer',
  'industryOfEmployment',
  'bankName',
  'bankAccountName',
  'bankAccountNumber',
  'annualIncome',
  'houseHoldIncome',
  'sourceOfWealth',
  'politicallyExposed'
]

const ACRD_KEYS = [
  'selfAccreditedInvestor',
  'totalPersonalAssetExceedsTwoMillionSGD',
  'lastTwelveMonthIncomeGreatherThanThreeHundredThousands',
  'personalFinancialAssetsExceedsOneMillion',
  'jointlyHeldAccountMeetingAnyAbove'
]

const DATE_KEYS = ['dob']

const checkIsIdentityDirty = (initialData, currentData) =>
  ID_KEYS.some(k => initialData[k] !== currentData[k])
const checkIsFinancialsDirty = (initialData, currentData) =>
  FINANCIALS_KEYS.some(k => initialData[k] !== currentData[k])
const checkIsAcrdDirty = (initialData, currentData) =>
  ACRD_KEYS.some(k => initialData[k] !== currentData[k])

const extractPropsFromObj = curry((keys, obj) =>
  keys.reduce(
    (acc, k) =>
      obj[k] !== undefined && obj[k] !== null ? { ...acc, [k]: obj[k] } : acc,
    {}
  )
)

const extractIdFromFormData = extractPropsFromObj(ID_KEYS)
const extractFinancialsFromFormData = extractPropsFromObj(FINANCIALS_KEYS)
const extractAcrdFromFormData = formData => {
  const accreditationDetails = mapObjIndexed(
    castStrToBool,
    extractPropsFromObj(ACRD_DETAILS_BOOLEAN_KEYS, formData)
  )
  const otherAcrdProps = mapObjIndexed(
    castStrToBool,
    extractPropsFromObj(ACRD_BOOLEAN_KEYS, formData)
  )

  return { accreditationDetails, ...otherAcrdProps }
}

const saveChangedFiles = (idDispatch, formData, id) => {
  const filesData = extractPropsFromObj(FILES_KEYS, formData)
  const saveFilePromises = Object.entries(filesData).map(([key, value]) => {
    const isValueFromApi = !!value?.fileName
    if (isValueFromApi) return Promise.resolve()

    const saveFilePromise = saveFile(idDispatch, {
      title: FILE_KEYS_TO_TITLE[key],
      file: value[0],
      remarks: '',
      type: 'individual',
      id
    })
    return saveFilePromise
  })

  return saveFilePromises
}

const castStrToBool = str => str === 'true'
