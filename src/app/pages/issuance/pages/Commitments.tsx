import React, { useEffect, useState } from 'react'
import { Button, Card, Grid } from '@material-ui/core'
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
import { getEndDate } from 'helpers/countdownTimer'
import { CloseDealDialog } from 'app/pages/issuance/components/Commitments/CloseDealDialog/CloseDealDialog'

export const Commitments = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
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
  const { theme, isTablet, isMobile } = useAppBreakpoints()
  const isCloseDealTimerCompleted =
    data !== undefined && getEndDate(data) !== undefined
      ? // @ts-expect-error
        new Date(getEndDate(data)) <= new Date()
      : false

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <>
      <Grid
        container
        justify={'space-between'}
        alignItems={'center'}
        style={{
          marginTop: theme.spacing(3.5),
          marginBottom: theme.spacing(5)
        }}
      >
        <PageHeader title={data?.tokenName} />
        <Button
          variant={'outlined'}
          color={'primary'}
          disabled={!isCloseDealTimerCompleted}
          onClick={() => setIsModalOpen(true)}
        >
          CLOSE DEAL
        </Button>
      </Grid>

      <Grid
        container
        justify='space-between'
        wrap={!isTablet ? 'wrap' : 'wrap-reverse'}
      >
        <Grid
          item
          container
          direction='row'
          spacing={0}
          xs={12}
          justify={'space-between'}
        >
          <Grid item container xs={12} md={8} lg={5} spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                variant='outlined'
                style={{ backgroundColor: theme.palette.backgrounds.default }}
              >
                <AmountRaised isNewThemeOn />
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
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
            justify={isMobile || isTablet ? 'center' : 'flex-end'}
            xs={12}
            md={2}
            style={{ marginTop: isMobile || isTablet ? theme.spacing(2) : 0 }}
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
      <CloseDealDialog
        open={isModalOpen}
        toggleOpen={() => setIsModalOpen(!isModalOpen)}
      />
    </>
  )
}
