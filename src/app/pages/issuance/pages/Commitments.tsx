import React, { useEffect } from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { CountdownTimer } from '../components/CountdownTimer/CountdownTimer'
import { Activities } from '../components/IssuanceLanding/Activities'
import { TotalInvestors } from '../components/IssuanceLanding/TotalInvestors'
import { AmountRaised } from '../components/IssuanceLanding/AmountRaised'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'
import { useParams } from 'react-router-dom'
import { TargetFundraise } from 'app/pages/issuance/components/IssuanceLanding/TargetFundraise'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { IssuanceLandingCard } from 'ui/SecondaryCard'
import { generatePath } from 'react-router'
import { history } from 'config/history'

export const Commitments = () => {
  // TODO Remove this after complete backend api endpoints
  useEffect(() => {
    console.log('useEffect')
    history.replace(
      generatePath(
        '/app/issuance/commitments/5f769b4caf160a120953a3ca/5fd772bcabc2557b8798de5f'
      )
    )
  }, [])
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data } = useDSOById(dsoId, issuerId)
  const { theme, isTablet } = useAppBreakpoints()

  const divider = (
    <Hidden mdUp>
      <Grid item xs={12}>
        <VSpacer size='small' />
      </Grid>
    </Hidden>
  )

  return (
    <>
      <PageHeader title={data?.tokenName} showBreadcrumbs={false} />
      <Grid
        container
        justify='space-between'
        wrap={!isTablet ? 'wrap' : 'wrap-reverse'}
      >
        <Grid
          item
          container
          direction='row'
          spacing={isTablet ? 0 : 3}
          style={{ marginBottom: theme.spacing(1.5) }}
          xs={12}
          md={8}
        >
          <Grid item xs={12} md={4} lg={4}>
            <IssuanceLandingCard variant='outlined'>
              <TotalInvestors />
            </IssuanceLandingCard>
          </Grid>

          {divider}

          <Grid item xs={12} md={4} lg={4}>
            <IssuanceLandingCard variant='outlined' style={{ height: '100%' }}>
              <AmountRaised />
            </IssuanceLandingCard>
          </Grid>

          {divider}

          <Grid item xs={12} md={4} lg={4}>
            <IssuanceLandingCard variant='outlined' style={{ height: '100%' }}>
              <TargetFundraise />
            </IssuanceLandingCard>
          </Grid>
        </Grid>

        {divider}

        <Grid
          container
          item
          xs={12}
          md={4}
          style={{ marginBottom: isTablet ? 0 : theme.spacing(3) }}
        >
          <CountdownTimer />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} style={{ paddingTop: 0, paddingLeft: 0 }}>
          <Activities />
        </Grid>
      </Grid>
    </>
  )
}
