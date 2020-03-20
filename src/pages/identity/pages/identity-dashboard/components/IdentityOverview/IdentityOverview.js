import React, { useEffect } from 'react'
import { Grid, Card, Typography, Box, CircularProgress, Button } from '@material-ui/core'
import { useIdentityState, useIdentityDispatch, getIdentity, IDENTITY_STATUS } from 'context/IdentityContext'
import { Link } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import { useAccreditationState, useAccreditationDispatch, ACCREDITATION_STATUS, getAccreditation } from 'context/AccreditationContext'
import { format } from 'date-fns'

export default function IdentityOverview () {
  const { isReady, identity, accreditation, shouldCreateNew, error } = useIdentityOverviewLogic()

  if (error.get) return <Alert severity='error'>{error.get}</Alert>

  return (
    <Card>
      <Box p={3}>
        {!isReady ? (
          <Box p={3} display='flex' justifyContent='center'>
            <CircularProgress size={48} />
          </Box>
        ) : shouldCreateNew ? (
          <Box display='flex' justifyContent='center'>
            <Box pt={{ xs: 6, md: 12 }} pb={{ xs: 8, md: 12 }} width='100%' maxWidth='18em'>
              Please select which type of account you would like to create?
              <Box mt={3}>
                <Link to='/app/identity/identification-steps/1' style={{ textDecoration: 'none' }}>
                  <Button as='div' fullWidth size='large' color='primary' variant='contained'>
                    Individual
                  </Button>
                </Link>
              </Box>
              <Box mt={3}>
                <a href='#' style={{ textDecoration: 'none' }}>
                  <Button as='div' fullWidth size='large' color='primary' variant='contained'>
                    Corporate
                  </Button>
                </a>
              </Box>
            </Box>
          </Box>
        ) : (
          <>
            <Typography component='h1' variant='h3'>My Identity</Typography>

            {/* Names Row */}
            <Box component='section' mt={3}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <StaticTextField label='First Name' value={identity.firstName} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StaticTextField label='Middle Name' value={identity.middleName} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StaticTextField label='Last Name' value={identity.lastName} />
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
                  <StaticTextField label='Date of Birth' value={identity.dob && format(new Date(identity.dob), 'MM/dd/yyyy')} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StaticTextField label='Marital Status' value={identity.maritalStatus} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StaticTextField label='Contact Number' value={identity.contactNumber} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StaticTextField label='Nationality' value={identity.nationality} />
                </Grid>
              </Grid>
            </Box>

            {/* Address (2) Columns */}
            <Box component='section' mt={4}>
              <Typography component='h3' variant='h6' gutterBottom={false} color='textSecondary'>Address</Typography>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <StaticTextField my={2} label='Unit' value={identity.address?.unit} />
                  <StaticTextField my={2} label='Line 1' value={identity.address?.line1} />
                  <StaticTextField my={2} label='Line 2' value={identity.address?.line2} />
                  <StaticTextField my={2} label='City' value={identity.address?.city} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StaticTextField my={2} label='Postal Code' value={identity.address?.postalCode} />
                  <StaticTextField my={2} label='State' value={identity.address?.state} />
                  <StaticTextField my={2} label='Country' value={identity.address?.country} />
                  <StaticTextField my={2} label='Country of Residence' value={identity.countryOfResidence} />
                </Grid>
              </Grid>
            </Box>

            {/* Financials */}
            <Box component='section' mt={4}>
              <Typography component='h2' variant='h4' gutterBottom={false}>Financials</Typography>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <StaticTextField my={2} label='Occupation' value={identity.occupation} />
                  <StaticTextField my={2} label='Employment Status' value={identity.employmentStatus} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StaticTextField my={2} label='Employer' value={identity.employer} />
                  <StaticTextField my={2} label='Industry Of Employment' value={identity.industryOfEmployment} />
                </Grid>
              </Grid>
            </Box>

            <Box component='section' mt={4}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  {/* Bank Account Column */}
                  <Typography component='h3' variant='h6' gutterBottom={false} color='textSecondary'>Bank Account</Typography>
                  <StaticTextField my={2} mt={1} label='Bank Name' value={identity.bankName} />
                  <StaticTextField my={2} label='Bank Account Name' value={identity.bankAccountName} />
                  <StaticTextField my={2} label='Bank Account Number' value={identity.bankAccountNumber} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* Income Column */}
                  <Typography component='h3' variant='h6' gutterBottom={false} color='textSecondary'>Income</Typography>
                  <StaticTextField my={2} mt={1} label='Annual Income' value={identity.annualIncome} />
                  <StaticTextField my={2} label='Household Income' value={identity.houseHoldIncome} />
                  <StaticTextField my={2} label='Source of Wealth' value={identity.sourceOfWealth} />
                  <StaticTextField my={2} label='Is Politically Exposed' value={identity.politicallyExposed} />
                </Grid>
              </Grid>
            </Box>

            {/* Accreditation */}
            <Box component='section' mt={2}>
              <Typography component='h2' variant='h4' gutterBottom={false}>Accreditation</Typography>

              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <StaticTextField my={2} label='Are you an accredited investor?' value={accreditation.selfAccreditedInvestor} />
                </Grid>
              </Grid>
            </Box>

            {/* Accreditation */}
            <Box component='section' mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography component='h3' variant='h6' gutterBottom={false} color='textSecondary'>Declarations</Typography>
                  <StaticTextField my={2} mt={1} label='Does your total personal asset exceed S$2,000,000?' value={accreditation.accreditationDetails?.totalPersonalAssetExceedsTwoMillionSGD} />
                  <StaticTextField my={2} label='Is your last income in the last 12 months greater than S$300,000?' value={accreditation.accreditationDetails?.lastTwelveMonthIncomeGreatherThanThreeHundredThousands} />
                  <StaticTextField my={2} label='Does your personal financial assets exceed S$1,000,000?' value={accreditation.accreditationDetails?.personalFinancialAssetsExceedsOneMillion} />
                  <StaticTextField my={2} label='Do you have any jointly held in any of the above?' value={accreditation.accreditationDetails?.jointlyHeldAccountMeetingAnyAbove} />
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
  const { identity, shouldCreateNew, ...id } = useIdentityState()
  const { accreditation, ...acrd } = useAccreditationState()
  const idDispatch = useIdentityDispatch()
  const acrdDispatch = useAccreditationDispatch()
  const error = id.error || acrd.error

  const isIdReady =
    ![IDENTITY_STATUS.INIT, IDENTITY_STATUS.GETTING].includes(id.status)
  const isAcrdReady =
    ![ACCREDITATION_STATUS.INIT, ACCREDITATION_STATUS.GETTING].includes(acrd.status)
  const isReady = isIdReady && isAcrdReady

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

  return { isReady, identity, accreditation, shouldCreateNew, error }
}

const StaticTextField = ({ value, label, ...props }) =>
  <Box as='section' {...props}>
    <Typography color='secondary' as='h3' variant='body2'>{label}</Typography>
    <Typography
      color={(value || typeof value === 'boolean' || typeof value === 'number')
        ? 'textPrimary'
        : 'textSecondary'}
    >
      {typeof value === 'boolean' && value
        ? 'Yes'
        : typeof value === 'boolean' && !value
        ? 'No'
        : value || typeof value === 'number'
        ? value
        : '--'}
    </Typography>
  </Box>
