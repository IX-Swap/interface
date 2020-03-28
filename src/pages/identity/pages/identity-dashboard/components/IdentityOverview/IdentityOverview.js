import React, { useEffect } from 'react'
import {
  Grid,
  Card,
  Typography,
  Box,
  CircularProgress,
  Button
} from '@material-ui/core'
import {
  useIdentityState,
  useIdentityDispatch,
  getIdentity,
  IDENTITY_STATUS,
  selectFile
} from 'context/IdentityContext'
import { Link } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import {
  useAccreditationState,
  useAccreditationDispatch,
  ACCREDITATION_STATUS,
  getAccreditation
} from 'context/AccreditationContext'
import { format } from 'date-fns'
import ImageFromApi from 'pages/identity/components/ImageFromApi/ImageFromApi'

export default function IdentityOverview ({ areAllCompleted }) {
  const {
    isReady,
    identity,
    accreditation,
    shouldCreateNew,
    error,
    files
  } = useIdentityOverviewLogic()

  if (error) return <Alert severity='error'>{error}</Alert>

  return (
    <Card>
      <Box p={3}>
        {!isReady ? (
          <Box p={3} display='flex' justifyContent='center'>
            <CircularProgress size={48} />
          </Box>
        ) : shouldCreateNew ? (
          <Box display='flex' justifyContent='center'>
            <Box
              pt={{ xs: 6, md: 12 }}
              pb={{ xs: 8, md: 12 }}
              width='100%'
              maxWidth='18em'
            >
              Please select which type of account you would like to create?
              <Box mt={3}>
                <Link
                  to='/app/identity/identification-steps/1'
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    as='div'
                    fullWidth
                    size='large'
                    color='primary'
                    variant='contained'
                  >
                    Individual
                  </Button>
                </Link>
              </Box>
              <Box mt={3}>
                <a href='#/app' style={{ textDecoration: 'none' }}>
                  <Button
                    as='div'
                    fullWidth
                    size='large'
                    color='primary'
                    variant='contained'
                  >
                    Corporate
                  </Button>
                </a>
              </Box>
            </Box>
          </Box>
        ) : (
          <>
            <Box display='flex'>
              <Box flex='1 1 auto'>
                <Typography component='h1' variant='h3'>
                  My Identity
                </Typography>
              </Box>
              {areAllCompleted && (
                <Button
                  variant='contained'
                  color='primary'
                  to='/app/identity/edit'
                  component={Link}
                >
                  Update
                </Button>
              )}
            </Box>

            {/* Names Row */}
            <Box component='section' mt={3}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <StaticTextField
                    label='First Name'
                    value={identity.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StaticTextField
                    label='Middle Name'
                    value={identity.middleName}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StaticTextField
                    label='Last Name'
                    value={identity.lastName}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Identity (3) Columns */}
            <Box component='section' mt={3}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <StaticTextField label='Gender' value={identity.gender} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StaticTextField
                    label='Date of Birth'
                    value={
                      identity.dob &&
                      format(new Date(identity.dob), 'MM/dd/yyyy')
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StaticTextField
                    label='Marital Status'
                    value={identity.maritalStatus}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StaticTextField
                    label='Contact Number'
                    value={identity.contactNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StaticTextField
                    label='Nationality'
                    value={identity.nationality}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Address (2) Columns */}
            <Box component='section' mt={4}>
              <Typography component='h3' variant='h6' gutterBottom={false}>
                Address
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <StaticTextField
                    my={2}
                    label='Unit'
                    value={identity.address?.unit}
                  />
                  <StaticTextField
                    my={2}
                    label='Line 1'
                    value={identity.address?.line1}
                  />
                  <StaticTextField
                    my={2}
                    label='Line 2'
                    value={identity.address?.line2}
                  />
                  <StaticTextField
                    my={2}
                    label='City'
                    value={identity.address?.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StaticTextField
                    my={2}
                    label='Postal Code'
                    value={identity.address?.postalCode}
                  />
                  <StaticTextField
                    my={2}
                    label='State'
                    value={identity.address?.state}
                  />
                  <StaticTextField
                    my={2}
                    label='Country'
                    value={identity.address?.country}
                  />
                  <StaticTextField
                    my={2}
                    label='Country of Residence'
                    value={identity.countryOfResidence}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Documents */}
            <Box component='section' mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography component='h3' variant='h6' gutterBottom={false}>
                    Documents
                  </Typography>
                  <StaticTextField
                    my={2}
                    mt={1}
                    label='ID (File)'
                    value={files.passport}
                  />
                  <StaticTextField
                    my={2}
                    mt={1}
                    label='ID Type'
                    value={identity.idType}
                  />
                  <StaticTextField
                    my={2}
                    mt={1}
                    label='ID Number'
                    value={identity.idNumber}
                  />
                  <StaticTextField
                    my={2}
                    mt={1}
                    label='Most Recent Utility Bill (File)'
                    value={files.utilityBill}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Financials */}
            <Box component='section' mt={4}>
              <Typography component='h2' variant='h4' gutterBottom={false}>
                Financials
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <StaticTextField
                    my={2}
                    label='Occupation'
                    value={identity.occupation}
                  />
                  <StaticTextField
                    my={2}
                    label='Employment Status'
                    value={identity.employmentStatus}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StaticTextField
                    my={2}
                    label='Employer'
                    value={identity.employer}
                  />
                  <StaticTextField
                    my={2}
                    label='Industry Of Employment'
                    value={identity.industryOfEmployment}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Bank Account (2) Columns */}
            <Box component='section' mt={4}>
              <Typography component='h3' variant='h6' gutterBottom={false}>
                Bank Account
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <StaticTextField
                    my={2}
                    label='Bank Name'
                    value={identity.bankName}
                  />
                  <StaticTextField
                    my={2}
                    label='Bank Account Number'
                    value={identity.bankAccountNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StaticTextField
                    my={2}
                    label='Bank Account Name'
                    value={identity.bankAccountName}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Income (2) Columns */}
            <Box component='section' mt={4}>
              <Typography component='h3' variant='h6' gutterBottom={false}>
                Income
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <StaticTextField
                    my={2}
                    mt={1}
                    label='Annual Income'
                    value={identity.annualIncome}
                  />
                  <StaticTextField
                    my={2}
                    label='Source of Wealth'
                    value={identity.sourceOfWealth}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StaticTextField
                    my={2}
                    label='Household Income'
                    value={identity.houseHoldIncome}
                  />
                  <StaticTextField
                    my={2}
                    label='Is Politically Exposed'
                    value={identity.politicallyExposed}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Accreditation */}
            <Box component='section' mt={2}>
              <Typography component='h2' variant='h4' gutterBottom={false}>
                Accreditation
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <StaticTextField
                    my={2}
                    label='Are you an accredited investor?'
                    value={accreditation.selfAccreditedInvestor}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Declarations */}
            <Box component='section' mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography component='h3' variant='h6' gutterBottom={false}>
                    Declarations
                  </Typography>
                  <StaticTextField
                    my={2}
                    mt={1}
                    label='Do your total personal assets exceed S$2,000,000?'
                    value={
                      accreditation.accreditationDetails
                        ?.totalPersonalAssetExceedsTwoMillionSGD
                    }
                  />
                  <StaticTextField
                    my={2}
                    label='Is your last income in the last 12 months greater than S$300,000?'
                    value={
                      accreditation.accreditationDetails
                        ?.lastTwelveMonthIncomeGreatherThanThreeHundredThousands
                    }
                  />
                  <StaticTextField
                    my={2}
                    label='Do your personal financial assets exceed S$1,000,000?'
                    value={
                      accreditation.accreditationDetails
                        ?.personalFinancialAssetsExceedsOneMillion
                    }
                  />
                  <StaticTextField
                    my={2}
                    label='Do you have any jointly held accounts meeting any of the above?'
                    value={
                      accreditation.accreditationDetails
                        ?.jointlyHeldAccountMeetingAnyAbove
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Proof of wealth */}
            <Box component='section' mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography component='h3' variant='h6' gutterBottom={false}>
                    Proof of wealth
                  </Typography>
                  <StaticTextField
                    my={2}
                    mt={1}
                    label='Proof of Wealth (File)'
                    value={files.proofOfWealth}
                  />
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Card>
  )
}

// ############################################################

const useIdentityOverviewLogic = () => {
  const id = useIdentityState()
  const { identity, shouldCreateNew } = id
  const { accreditation, ...acrd } = useAccreditationState()
  const idDispatch = useIdentityDispatch()
  const acrdDispatch = useAccreditationDispatch()
  const error = id.error.get || acrd.error.get

  const isIdReady = ![IDENTITY_STATUS.INIT, IDENTITY_STATUS.GETTING].includes(
    id.status
  )
  const isAcrdReady = ![
    ACCREDITATION_STATUS.INIT,
    ACCREDITATION_STATUS.GETTING
  ].includes(acrd.status)
  const isReady = isIdReady && isAcrdReady

  const files = {
    passport: { ...selectFile(id, 'Passport'), type: 'file' },
    utilityBill: { ...selectFile(id, 'Utility Bill'), type: 'file' },
    proofOfWealth: { ...selectFile(id, 'Proof of Wealth'), type: 'file' }
  }

  useEffect(() => {
    // fetch identity data for initial values
    if (id.status === IDENTITY_STATUS.INIT) {
      getIdentity(idDispatch).catch(() => {})
    }

    // fetch accreditation data for initial values
    if (acrd.status === ACCREDITATION_STATUS.INIT) {
      getAccreditation(acrdDispatch).catch(() => {})
    }
  }, [id.status, acrd.status]) // eslint-disable-line react-hooks/exhaustive-deps

  return { isReady, identity, accreditation, shouldCreateNew, error, files }
}

const StaticTextField = ({ value, label, ...props }) => (
  <Box as='section' {...props}>
    <Typography color='primary' as='h3' variant='body2'>
      {label}
    </Typography>
    <Typography
      color={
        value || typeof value === 'boolean' || typeof value === 'number'
          ? 'textPrimary'
          : 'textSecondary'
      }
    >
      {typeof value === 'boolean' && value ? ( // handle true
        'Yes'
      ) : typeof value === 'boolean' && !value ? ( // handle false
        'No'
      ) : value?.type === 'file' && isImg(value.fileName) ? ( // handle image file
        <ImageFromApi url={fixFileUrl(value.url)} />
      ) : value?.type === 'file' && value.fileName ? ( // handle other files
        value.fileName
      ) : value?.type === 'file' && !value.fileName ? ( // handle empty file
        '--'
      ) : typeof value === 'string' || typeof value === 'number' ? ( // handle string/number
        value
      ) : (
        '--'
      ) /* handle empty values */}
    </Typography>
  </Box>
)

const isImg = str => /\.(gif|jpe?g|tiff|png|webp|bmp)$/i.test(str)
const fixFileUrl = str => str.replace('http://localhost:3000', '')
