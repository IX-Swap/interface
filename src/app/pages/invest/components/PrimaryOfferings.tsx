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
import { DSOTableFilters } from 'app/pages/invest/components/DSOTable/DSOTableFilters'
import { TablePagination } from 'ui/Pagination/TablePagination'
import { Pagination } from 'ui/Pagination/Pagination'

export interface PrimaryOfferingsProps {
  fullview?: boolean
}

export const PrimaryOfferings = ({
  fullview = false
}: PrimaryOfferingsProps) => {
  const classes = useStyles()
  const { isMiniLaptop, isTablet } = useAppBreakpoints()
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search')
  const primaryOfferingSearch = getFilterValue('primaryOfferingSearch')
  const capitalStructure = getFilterValue('capitalStructure')
  const currency = getFilterValue('currency')
  const isPriceAscending = getFilterValue('isPriceAscending')
  const isFavorite = getFilterValue('isFavorite')
  const network = getFilterValue('network')
  const sortField = getFilterValue('sortField')
  const sortOrder = getFilterValue('sortOrder')

  const {
    items,
    status,
    total,
    isLoading,
    setPage,
    setRowsPerPage,
    page,
    rowsPerPage
  } = useTableWithPagination({
    queryKey: fullview
      ? dsoQueryKeys.getApprovedList
      : dsoQueryKeys.getPromoted,
    uri: fullview
      ? issuanceURL.dso.getAllApproved
      : issuanceURL.dso.getAllPromoted,
    defaultFilter: {
      search: search ?? primaryOfferingSearch,
      capitalStructure,
      currency,
      isPriceAscending:
        isPriceAscending !== undefined ? isPriceAscending === 'yes' : undefined,
      isFavorite,
      network,
      sortField,
      sortOrder
    },
    queryEnabled: true,
    defaultRowsPerPage: 6,
    disabledUseEffect: true
  })

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage - 1)
  }

  const handleChangePageZeroBased = (_: any, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const renderContent = () => {
    if (status === 'loading') {
      return null
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
      <Grid container wrap='wrap' className={classes.container}>
        {(items as DigitalSecurityOffering[]).slice(0, 3).map(dso => (
          <DSOCard
            type='Primary'
            data={dso}
            viewURL={InvestRoute.view}
            key={dso._id}
          />
        ))}
      </Grid>
    )
  }

  const renderFullviewContent = () => {
    if (isLoading) {
      return <>Loading...</>
    }

    if (items.length < 1) {
      return <NoOffers />
    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container wrap='wrap' className={classes.container}>
            {(items as DigitalSecurityOffering[]).map(dso => (
              <DSOCard
                type='Primary'
                data={dso}
                viewURL={InvestRoute.view}
                key={dso._id}
              />
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent={isTablet ? 'flex-end' : 'center'}
        >
          <Grid item>
            {isTablet ? (
              <TablePagination
                count={total}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage='Cards'
                page={page}
                onRowsPerPageChange={handleChangeRowsPerPage}
                onPageChange={handleChangePageZeroBased}
                rowsPerPageOptions={[6, 10, 25, 50]}
              />
            ) : (
              <Pagination
                count={Math.floor(total / 6)}
                page={page + 1}
                onChange={handleChangePage}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={3}>
      {fullview ? (
        <Grid item xs={12}>
          <DSOTableFilters />
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          container
          alignItems='center'
          justifyContent='space-between'
        >
          <Grid item>
            <Typography variant='h4' display='inline-flex' alignItems='center'>
              Primary Offerings <Count value={total} />
            </Typography>
          </Grid>
          <Grid item>
            <Button
              component={AppRouterLinkComponent}
              color='primary'
              variant='text'
              to={InvestRoute.primaryOfferings}
              data-testid='invest-link'
              sx={{ px: 0 }}
            >
              View all
            </Button>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        {fullview ? renderFullviewContent() : renderContent()}
      </Grid>
    </Grid>
  )
}
