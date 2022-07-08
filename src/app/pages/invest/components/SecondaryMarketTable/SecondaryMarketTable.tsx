import React from 'react'
import { Button, Grid } from '@mui/material'
import { TableView } from 'components/TableWithPagination/TableView'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { Actions } from 'app/pages/invest/components/SecondaryMarketTable/Actions'
import { exchange as exchangeURL } from 'config/apiURL'
import { columns } from 'app/pages/invest/components/SecondaryMarketTable/columns'
import { SearchFilter } from 'app/components/SearchFilter'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useTheme } from '@mui/material/styles'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const SecondaryMarketTable = () => {
  const theme = useTheme()
  const { getFilterValue } = useQueryFilter()
  const { isMobile } = useAppBreakpoints()
  const search = getFilterValue('search')
  const secondaryMarketSearch = getFilterValue('secondaryMarketSearch')

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container justifyContent={'space-between'}>
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <SearchFilter
            data-testid='secondaryMarketSearch'
            fullWidth
            filterValue={'secondaryMarketSearch'}
            inputAdornmentPosition='end'
            placeholder='Search'
          />
        </Grid>
        <Grid item xs={12} sm={'auto'} order={isMobile ? -1 : 'initial'} pb={2}>
          <Button
            component={AppRouterLinkComponent}
            to={AccountsRoute.myHoldings}
            color='primary'
            variant='outlined'
            size='large'
            disableElevation
            style={{ color: theme.palette.primary.main }}
          >
            My Holdings
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ overflowX: 'scroll', maxWidth: '100%' }}>
        <TableView
          uri={exchangeURL.marketList}
          name={exchangeQueryKeys.marketList}
          columns={columns}
          hasActions
          actions={Actions}
          filter={{ listingKeyword: search ?? secondaryMarketSearch } as any}
        />
      </Grid>
    </Grid>
  )
}
