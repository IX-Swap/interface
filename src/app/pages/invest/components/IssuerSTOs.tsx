import React from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { Button, Grid, Typography } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/styles/OTCMarket.style'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { dsoQueryKeys } from 'config/queryKeys'
import { authorizerURL, issuanceURL } from 'config/apiURL'
import { DigitalSecurityOffering } from 'types/dso'
import { STOCard } from 'app/pages/invest/components/STOCard/STOCard'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { NoOffers } from 'app/pages/invest/components/NoOffers/NoOffers'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { Slide } from 'pure-react-carousel'
import Box from '@mui/material/Box'
import { DSOCardsCarousel } from 'app/pages/invest/components/DSOCardsCarousel/DSOCardsCarousel'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { useIsAuthorizer } from 'helpers/acl'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const IssuerSTOs = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const isAuthorizer = useIsAuthorizer()

  const classes = useStyles()
  const { isMiniLaptop } = useAppBreakpoints()

  const { items, status, isLoading, refetch } = useTableWithPagination({
    queryKey: dsoQueryKeys.getDSOsByUserId(userId),
    uri: isAuthorizer
      ? authorizerURL.offerings
      : issuanceURL.dso.getByUserId(userId),
    defaultFilter: {
      status: 'Draft,Submitted,Approved,Rejected' as any
    },
    queryEnabled: true,
    defaultRowsPerPage: 6,
    disabledUseEffect: true
  })

  const renderContent = () => {
    if (status === 'loading' || isLoading) {
      return <LoadingIndicator />
    }

    const renderItems = (items as DigitalSecurityOffering[]).slice(0, 3)

    if (renderItems.length < 1) {
      return <NoOffers />
    }

    if (isMiniLaptop) {
      return (
        <DSOCardsCarousel totalSlides={renderItems.length}>
          {renderItems.map((dso, i) => (
            <Slide index={i} key={dso._id} className='custom'>
              <Box paddingRight={1.5} height='100%'>
                <STOCard
                  type={'Primary'}
                  data={dso}
                  viewURL={IssuanceRoute.view}
                  key={dso._id}
                  refetch={refetch}
                />
              </Box>
            </Slide>
          ))}
        </DSOCardsCarousel>
      )
    }

    return (
      <Grid container wrap='wrap' className={classes.container}>
        {(items as DigitalSecurityOffering[]).slice(0, 3).map(dso => (
          <STOCard
            type='Primary'
            data={dso}
            viewURL={IssuanceRoute.view}
            key={dso._id}
            refetch={refetch}
          />
        ))}
      </Grid>
    )
  }

  return (
    <FieldContainer>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          container
          alignItems='center'
          justifyContent='space-between'
        >
          <Grid item>
            <Typography variant='h5' display='inline-flex' alignItems='center'>
              My STOs
            </Typography>
            <Typography color={'text.secondary'} mt={2}>
              Browse through your created STOs according to launch, completion,
              and releases dates.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              component={AppRouterLinkComponent}
              color='primary'
              variant='outlined'
              to={IssuanceRoute.list}
              data-testid='invest-link'
              // sx={{ px: 0 }}
            >
              View All My STOs
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {renderContent()}
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
