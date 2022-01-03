import React, { useState } from 'react'
import { Button, Card, Grid } from '@material-ui/core'
import { CountdownTimer } from '../components/CountdownTimer/CountdownTimer'
import { AmountRaised } from 'app/pages/issuance/components/CapTable/AmountRaised'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'
import { useParams } from 'react-router-dom'
import { TargetFundraise } from 'app/pages/issuance/components/IssuanceLanding/TargetFundraise'
import { PageHeader } from 'app/pages/issuance/components/Commitments/PageHeader'
import { InvestorCommitmentTable } from 'app/pages/issuance/components/Commitments/InvestorCommitmentTable'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { getEndDate } from 'helpers/countdownTimer'
import { CloseDealDialog } from 'app/pages/issuance/components/Commitments/CloseDealDialog/CloseDealDialog'
import { DSOFilter } from 'app/pages/issuance/components/Commitments/DSOFilter'

export const Commitments = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data, isLoading } = useDSOById(dsoId, issuerId)

  const isDealClosed =
    data?.dealStatus !== undefined && data.dealStatus === 'Closed'
  const { theme, isTablet, isMobile, isMiniLaptop } = useAppBreakpoints()
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
        item
        container
        justify={'space-between'}
        alignItems={'center'}
        style={{
          marginTop: theme.spacing(3.5),
          marginBottom: theme.spacing(5)
        }}
        xs={12}
      >
        <Grid item xs={12} lg={9}>
          <PageHeader title={data?.tokenName} />
          {isMiniLaptop && <VSpacer size={'small'} />}
        </Grid>
        <Grid item container xs={12} lg={3} justify={'space-between'}>
          <Grid item xs={12} sm={6} md={4} lg={7}>
            <DSOFilter />
            {isMobile && <VSpacer size={'small'} />}
          </Grid>
          <Grid
            item
            container
            justify={'flex-end'}
            xs={12}
            sm={6}
            md={6}
            lg={5}
          >
            <Button
              variant={'outlined'}
              color={'primary'}
              disabled={!isCloseDealTimerCompleted || isDealClosed}
              onClick={() => setIsModalOpen(true)}
            >
              {isDealClosed ? 'Closed' : 'Close deal'}
            </Button>
          </Grid>
        </Grid>
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
          <Grid item container xs={12} md={8} lg={5} spacing={isTablet ? 0 : 3}>
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
            justify={isTablet ? 'center' : 'flex-end'}
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
      <CloseDealDialog
        open={isModalOpen}
        toggleOpen={() => setIsModalOpen(!isModalOpen)}
      />
    </>
  )
}
