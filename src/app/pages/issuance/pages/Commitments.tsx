import React, { useEffect, useState } from 'react'
import { Button, Card, Grid } from '@material-ui/core'
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
import { getEndDate } from 'helpers/countdownTimer'
import { CloseDealDialog } from 'app/pages/issuance/components/Commitments/CloseDealDialog/CloseDealDialog'

export const Commitments = () => {
  // TODO Remove this after complete backend api endpoints
  useEffect(() => {
    history.replace(
      generatePath(
        '/app/issuance/commitments/5f769b4caf160a120953a3ca/5fd772bcabc2557b8798de5f'
      )
    )
  }, [])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data } = useDSOById(dsoId, issuerId)
  const { theme, isTablet, isMobile } = useAppBreakpoints()
  const isCloseDealTimerCompleted =
    data !== undefined && getEndDate(data) !== undefined
      ? // @ts-expect-error
        new Date(getEndDate(data)) <= new Date()
      : false

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
