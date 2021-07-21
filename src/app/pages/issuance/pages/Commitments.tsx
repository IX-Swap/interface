import React, { useEffect } from 'react'
import { Card, Grid } from '@material-ui/core'
import { CountdownTimer } from '../components/CountdownTimer/CountdownTimer'
import { AmountRaised } from '../components/IssuanceLanding/AmountRaised'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { useParams } from 'react-router-dom'
import { TargetFundraise } from 'app/pages/issuance/components/IssuanceLanding/TargetFundraise'
import { generatePath } from 'react-router'
import { history } from 'config/history'
import { PageHeader } from 'app/pages/issuance/components/Commitments/PageHeader'
import { InvestorCommitmentTable } from 'app/pages/issuance/components/Commitments/InvestorCommitmentTable'
import { VSpacer } from 'components/VSpacer'

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

  return (
    <>
      <PageHeader title={data?.tokenName} />
      <Grid
        container
        justify='space-between'
        wrap={!isTablet ? 'wrap' : 'wrap-reverse'}
      >
        <Grid item container direction='row' spacing={isTablet ? 0 : 3} xs={12}>
          <Grid item xs={12} md={4} lg={4}>
            <Card
              variant='outlined'
              style={{ backgroundColor: theme.palette.backgrounds.default }}
            >
              <AmountRaised isNewThemeOn />
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Card
              variant='outlined'
              style={{ backgroundColor: theme.palette.backgrounds.default }}
            >
              <TargetFundraise isNewThemeOn />
            </Card>
          </Grid>

          <Grid item style={{ marginLeft: 'auto' }}>
            <CountdownTimer my={0} mx={0} isNewThemeOn />
          </Grid>
        </Grid>
      </Grid>

      <VSpacer size={'extraMedium'} />

      <Grid container>
        <Grid item xs={12} style={{ paddingTop: 0, paddingLeft: 0 }}>
          <InvestorCommitmentTable />
        </Grid>
      </Grid>
    </>
  )
}
