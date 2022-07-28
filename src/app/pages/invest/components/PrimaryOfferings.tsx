import React from 'react'
import { InvestRoute } from 'app/pages/invest/router/config'
import { Button, Grid, Typography } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/styles/OTCMarket.style'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { dsoQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { DigitalSecurityOffering } from 'types/dso'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { DSOCard } from 'app/pages/invest/components/DSOCard/DSOCard'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Count } from 'app/pages/invest/components/Count'
import { NoOffers } from 'app/pages/invest/components/NoOffers/NoOffers'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { Slide } from 'pure-react-carousel'
import Box from '@mui/material/Box'
import { DSOCardsCarousel } from 'app/pages/invest/components/DSOCardsCarousel/DSOCardsCarousel'

export const PrimaryOfferings = () => {
  const classes = useStyles()
  const { isMiniLaptop } = useAppBreakpoints()
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search')
  const primaryOfferingSearch = getFilterValue('primaryOfferingSearch')

  const { items, status, total } = useTableWithPagination({
    queryKey: dsoQueryKeys.getPromoted,
    uri: issuanceURL.dso.getAllPromoted,
    defaultFilter: { search: search ?? primaryOfferingSearch },
    queryEnabled: true,
    defaultRowsPerPage: 5,
    disabledUseEffect: true
  })

  if (status === 'loading') {
    return null
  }

  const renderContent = () => {
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
                <DSOCard
                  type={'Primary'}
                  data={dso}
                  viewURL={InvestRoute.view}
                  key={dso._id}
                />
              </Box>
            </Slide>
          ))}
        </DSOCardsCarousel>
      )
    }

    return (
      <Grid container wrap={'wrap'} className={classes.container}>
        {(items as DigitalSecurityOffering[]).slice(0, 3).map((dso, i) => (
          <DSOCard
            type={'Primary'}
            data={dso}
            viewURL={InvestRoute.view}
            key={dso._id}
          />
        ))}
      </Grid>
    )
  }

  return (
    <Grid container direction={'column'} spacing={3}>
      <Grid
        item
        container
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Grid item>
          <Typography
            variant='h4'
            display={'inline-flex'}
            alignItems={'center'}
          >
            Primary Offerings <Count value={total} />
          </Typography>
        </Grid>
        <Grid item>
          <Button
            component={AppRouterLinkComponent}
            color='primary'
            variant='text'
            to={InvestRoute.landing}
            data-testid='invest-link'
            sx={{ px: 0 }}
          >
            View all
          </Button>
        </Grid>
      </Grid>

      <Grid item>{renderContent()}</Grid>
    </Grid>
  )
}
