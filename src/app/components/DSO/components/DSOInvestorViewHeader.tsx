import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { DigitalSecurityOffering } from 'types/dso'
import { InvestRoute } from 'app/pages/invest/router/config'
import { DSOInvestorOverview } from 'app/components/DSO/components/DSOInvestorOverview'
import { VSpacer } from 'components/VSpacer'
import useStyles from 'app/components/DSO/components/styles'
import { useAuth } from 'hooks/auth/useAuth'

export interface DSOInvestorViewHeaderProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorViewHeader = (props: DSOInvestorViewHeaderProps) => {
  const { dso } = props
  const { user } = useAuth()
  const classes = useStyles()
  const { isTablet, theme } = useAppBreakpoints()
  const isInvestButtonDisabled = dso.createdBy === user?._id

  return (
    <Grid
      container
      direction={'column'}
      alignItems={isTablet ? 'flex-start' : 'center'}
      justify='space-between'
      wrap='nowrap'
      className={classes.newDSOViewHeaderStyles}
    >
      <Grid
        item
        container
        justify={isTablet ? 'center' : 'space-between'}
        alignItems={'center'}
      >
        <Grid
          item
          container
          direction={isTablet ? 'column' : 'row'}
          alignItems='center'
          wrap='nowrap'
          xs={isTablet ? 12 : 9}
          spacing={3}
        >
          <Grid item>
            <DSOLogo
              dsoId={dso._id}
              size={isTablet ? 240 : 124}
              variant='circle'
            />
            {isTablet && <VSpacer size={'medium'} />}
          </Grid>

          <Grid
            item
            container
            direction={'column'}
            alignItems={isTablet ? 'center' : 'flex-start'}
          >
            <Typography variant='h2' style={{ fontSize: isTablet ? 32 : 40 }}>
              {dso.tokenName} ({dso.tokenSymbol})
            </Typography>

            {isTablet && <VSpacer size={'medium'} />}

            <Typography variant='h6' style={{ fontWeight: 400, opacity: 0.7 }}>
              {dso.corporate.companyLegalName}
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <Button
            variant='contained'
            disabled={isInvestButtonDisabled}
            disableElevation
            style={{
              minWidth: isTablet ? 220 : 140,
              marginTop: isTablet ? 30 : 0,
              backgroundColor: isInvestButtonDisabled ? 'lightgray' : '#ffffff',
              color: isInvestButtonDisabled
                ? 'rgba(0, 0, 0, 0.26)'
                : theme.palette.slider.activeBackground
            }}
            component={AppRouterLinkComponent}
            to={InvestRoute.makeInvestment}
            params={{ dsoId: dso._id, issuerId: dso.user }}
          >
            Invest
          </Button>
        </Grid>
      </Grid>
      <VSpacer size={'extraMedium'} />
      <DSOInvestorOverview dso={dso} />
    </Grid>
  )
}
