import React, { useEffect } from 'react'
import { Grid, Card, Typography, Box, CircularProgress, Button } from '@material-ui/core'
import { useIdentityState, useIdentityDispatch, getIdentity } from 'context/IdentityContext'
import { Link } from 'react-router-dom'

export default function IdentityOverview () {
  const { status, identity, shouldCreateNew } = useIdentityOverviewLogic()

  return (
    <Card>
      <Box p={3}>
        {['INIT', 'GETTING'].includes(status) ? (
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
                <Grid item xs={12} sm={4}>
                  <StaticTextField label='Email' value={identity.email} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StaticTextField label='Contact Number' value={identity.contactNumber} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StaticTextField label='Nationality' value={identity.nationality} />
                </Grid>
              </Grid>
            </Box>

            <Box component='section' mt={4}>
              <Typography component='h2' variant='h6' gutterBottom={false}>Address</Typography>

              <StaticTextField mt={1} label='Unit' value={identity.address?.unit} />
              <StaticTextField label='Line 1' value={identity.address?.line1} />
              <StaticTextField label='Line 2' value={identity.address?.line2} />
            </Box>

            <Box mt={4}>
              <StaticTextField label='Contact Number' value={identity.contactNumber} />
              <StaticTextField label='Nationality' value={identity.nationality} />
            </Box>
          </>
        )}
      </Box>
    </Card>
  )
}

// ############################################################

const useIdentityOverviewLogic = () => {
  const { status, identity, shouldCreateNew } = useIdentityState()
  const idDispatch = useIdentityDispatch()

  // fetch identity data for initial values
  const isInit = status === 'INIT'
  useEffect(() => {
    if (isInit) getIdentity(idDispatch)
  }, [isInit]) // eslint-disable-line react-hooks/exhaustive-deps

  return { status, identity, shouldCreateNew }
}

const StaticTextField = ({ value, label, ...props }) =>
  <Box as='section' my={2} {...props}>
    <Typography color='secondary' as='h3' variant='body2'>{label}</Typography>
    <Typography>{value || '--'}</Typography>
  </Box>
