import React, { useEffect } from 'react'
import { Card, Grid, Hidden } from '@material-ui/core'
import { CountdownTimer } from '../components/CountdownTimer/CountdownTimer'
import { AmountRaised } from '../components/IssuanceLanding/AmountRaised'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'
import { useHistory, useParams } from 'react-router-dom'
import { TargetFundraise } from 'app/pages/issuance/components/IssuanceLanding/TargetFundraise'
import { generatePath } from 'react-router'
import { PageHeader } from 'app/pages/issuance/components/Commitments/PageHeader'
import { InvestorCommitmentTable } from 'app/pages/issuance/components/Commitments/InvestorCommitmentTable'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { isValidDSOId } from 'helpers/isValidDSOId'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'

export const Commitments = () => {
  const { data: listData, isLoading } = useDSOsByUserId()
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { replace } = useHistory()
  // TODO Do refactoring after complete design with DSO Select
  useEffect(() => {
    if (!isValidDSOId(dsoId) && listData.list.length > 0) {
      replace(
        generatePath(IssuanceRoute.commitments, {
          dsoId: listData.list[0]._id,
          issuerId: listData.list[0].user
        })
      )
    }
  }, [dsoId, issuerId, listData.list, replace])

  const { data } = useDSOById(dsoId, issuerId)
  // const data = listData.list[0]
  const { theme, isTablet } = useAppBreakpoints()

  const divider = (
    <Hidden mdUp>
      <Grid item xs={12}>
        <VSpacer size='small' />
      </Grid>
    </Hidden>
  )

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <>
      <PageHeader title={data?.tokenName} />
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
            <Card
              variant='outlined'
              style={{ backgroundColor: theme.palette.backgrounds.default }}
            >
              <AmountRaised isNewThemeOn />
            </Card>
          </Grid>

          {divider}

          <Grid item xs={12} md={4} lg={4}>
            <Card
              variant='outlined'
              style={{ backgroundColor: theme.palette.backgrounds.default }}
            >
              <TargetFundraise isNewThemeOn />
            </Card>
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
          <InvestorCommitmentTable />
        </Grid>
      </Grid>
    </>
  )
}
