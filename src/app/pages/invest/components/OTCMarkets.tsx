import React from 'react'
import { InvestRoute } from 'app/pages/invest/router/config'
import { Grid, Typography } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/styles/OTCMarket.style'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { OTCUrl } from 'config/apiURL'
import { otcQueryKeys } from 'config/queryKeys'
import { DigitalSecurityOffering } from 'types/dso'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
// TODO: When we will have multiple OTC pairs adjust this
import { useFeaturedPair } from 'app/pages/invest/hooks/useFeaturedPair'
import { DSOCard } from 'app/pages/invest/components/DSOCard/DSOCard'
import { Count } from 'app/pages/invest/components/Count'
import { NoOffers } from 'app/pages/invest/components/NoOffers/NoOffers'
import { DSOCardsCarousel } from 'app/pages/invest/components/DSOCardsCarousel/DSOCardsCarousel'
import { Slide } from 'pure-react-carousel'
import Box from '@mui/material/Box'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const OTCMarket = () => {
  const classes = useStyles()
  const { isMiniLaptop } = useAppBreakpoints()
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search')
  const otcMarketSearch = getFilterValue('otcMarketSearch')
  const { items, status } = useTableWithPagination({
    queryKey: otcQueryKeys.getApprovedListingsList,
    uri: OTCUrl.getApprovedListingsList,
    defaultFilter: { search: search ?? otcMarketSearch },
    queryEnabled: true,
    defaultRowsPerPage: 5,
    disabledUseEffect: true
  })
  const { data, isLoading } = useFeaturedPair()

  const activeDSOs = items.filter(
    item => (item as any)?.dso === data?.listing?.dso?._id
  )

  if (status === 'loading' || isLoading) {
    return null
  }

  const renderItems = activeDSOs as DigitalSecurityOffering[]

  const renderContent = () => {
    if (activeDSOs.length === 0) {
      return <NoOffers />
    }

    if (isMiniLaptop) {
      return (
        <DSOCardsCarousel totalSlides={renderItems.length}>
          {renderItems.map((otc, i) => (
            <Slide index={i} key={otc._id} className='custom'>
              <Box paddingRight={1.5} height='100%'>
                <DSOCard
                  type={'OTC'}
                  data={otc}
                  viewURL={InvestRoute.trading}
                  key={otc._id}
                />
              </Box>
            </Slide>
          ))}
        </DSOCardsCarousel>
      )
    }

    return (
      <Grid container justifyContent={'flex-end'}>
        <Grid container item wrap={'wrap'} className={classes.container}>
          {renderItems.map((otc, i) => (
            <DSOCard
              type={'OTC'}
              data={otc}
              viewURL={InvestRoute.trading}
              key={otc._id}
            />
          ))}
        </Grid>
        {/* Put table pagination here when we will have multiple featured pairs. Take
      it from Primary Offerings, it's identical */}
      </Grid>
    )
  }

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <Typography variant='h4' display={'inline-flex'} alignItems={'center'}>
          OTC Market <Count value={activeDSOs.length} />
        </Typography>
      </Grid>
      <Grid item>{renderContent()}</Grid>
    </Grid>
  )
}
