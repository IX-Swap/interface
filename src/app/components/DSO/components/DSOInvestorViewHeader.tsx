import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { DigitalSecurityOffering } from 'types/dso'
import { makeURL } from 'config/appURL'

// Had to hack this one. There is a problem with circular references, will address this issue with the next release.
const makeInvestment = makeURL([
  'app',
  'invest',
  'offerings',
  'issuerId',
  'dsoId',
  'makeInvestment'
])

export interface DSOInvestorViewHeaderProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorViewHeader = (props: DSOInvestorViewHeaderProps) => {
  const { dso } = props
  const { isTablet } = useAppBreakpoints()

  return (
    <Grid
      container
      direction={isTablet ? 'column' : 'row'}
      alignItems={isTablet ? 'flex-start' : 'center'}
      justify='space-between'
      wrap='nowrap'
      style={{ marginBottom: 50 }}
    >
      <Grid
        item
        container
        alignItems='center'
        wrap='nowrap'
        xs={12}
        spacing={3}
      >
        <Grid item>
          <DSOLogo dsoId={dso._id} size={124} variant='square' />
        </Grid>
        <Grid item container direction='column' spacing={1}>
          <Grid item>
            <Typography variant='h4'>
              {dso.tokenName} ({dso.tokenSymbol})
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant='h5' style={{ fontWeight: 400 }}>
              {dso.issuerName}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant='subtitle1' component='span'>
              Currency:{' '}
            </Typography>
            <Typography variant='body1' component='span'>
              {dso.currency.symbol}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Button
          color='primary'
          variant='contained'
          disableElevation
          style={{ minWidth: 140, marginTop: isTablet ? 30 : 0 }}
          component={AppRouterLinkComponent}
          to={makeInvestment}
          params={{ dsoId: dso._id, issuerId: dso.user }}
        >
          Invest
        </Button>
      </Grid>
    </Grid>
  )
}
