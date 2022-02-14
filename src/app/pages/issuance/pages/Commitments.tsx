import React from 'react'
import { Card, Grid } from '@material-ui/core'
import { CountdownTimer } from '../components/CountdownTimer/CountdownTimer'
import { AmountRaised } from 'app/pages/issuance/components/CapTable/AmountRaised'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'
import { useParams } from 'react-router-dom'
import { TargetFundraise } from 'app/pages/issuance/components/IssuanceLanding/TargetFundraise'
import { InvestorCommitmentTable } from 'app/pages/issuance/components/Commitments/InvestorCommitmentTable'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'

export const Commitments = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { isLoading } = useDSOById(dsoId, issuerId)
  const { theme, isTablet } = useAppBreakpoints()

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <>
      <Grid
        container
        justifyContent='space-between'
        wrap={!isTablet ? 'wrap' : 'wrap-reverse'}
      >
        <Grid
          item
          container
          direction='row'
          spacing={0}
          xs={12}
          justifyContent={'space-between'}
        >
          <Grid item container xs={12} md={8} lg={8} spacing={isTablet ? 0 : 1}>
            <Grid item xs={12} md={6}>
              <Card
                variant='outlined'
                style={{ backgroundColor: theme.palette.backgrounds.default }}
              >
                <AmountRaised isNewThemeOn />
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              {isTablet && <VSpacer size={'small'} />}
              <Card
                variant='outlined'
                style={{
                  backgroundColor: theme.palette.backgrounds.default
                }}
              >
                <TargetFundraise isNewThemeOn />
              </Card>
            </Grid>
          </Grid>

          <Grid
            item
            container
            justifyContent={isTablet ? 'center' : 'flex-end'}
            xs={12}
            md={2}
            style={{ marginTop: isTablet ? theme.spacing(2) : 0 }}
          >
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
