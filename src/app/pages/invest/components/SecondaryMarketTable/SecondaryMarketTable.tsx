import { Button, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { NoOffers } from 'app/pages/invest/components/NoOffers/NoOffers'
import { Actions } from 'app/pages/invest/components/SecondaryMarketTable/Actions'
import { columns } from 'app/pages/invest/components/SecondaryMarketTable/columns'
import { SecondaryMarketList } from 'app/pages/invest/components/SecondaryMarketTable/SecondaryMarketList'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { exchange as exchangeURL } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'

export const SecondaryMarketTable = () => {
  const theme = useTheme()
  const { isMobile, isTablet } = useAppBreakpoints()
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search')
  const sortBy = getFilterValue('sortBy')
  const secondaryMarketSearch = getFilterValue('secondaryMarketSearch')

  return (
    <Grid container direction='column' spacing={3}>
      <Grid
        item
        container
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        wrap={'nowrap'}
        spacing={2}
      >
        <Grid item width={'100%'}>
          <TextInputSearchFilter
            data-testid='secondaryMarketSearch'
            fullWidth
            filterValue={'secondaryMarketSearch'}
            placeholder='Search'
          />
        </Grid>
        <Grid item>
          <Button
            component={AppRouterLinkComponent}
            to={AccountsRoute.myHoldings}
            color='primary'
            variant='outlined'
            size='large'
            disableElevation
            style={{
              color: theme.palette.primary.main,
              width: isMobile ? '100%' : 192,
              height: 50
            }}
          >
            My Holdings
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ActiveElementContextWrapper>
          <TableView
            noDataComponent={<NoOffers forTable />}
            uri={exchangeURL.marketList}
            name={exchangeQueryKeys.marketList}
            columns={columns}
            actions={Actions}
            filter={
              sortBy !== undefined
                ? ({
                    listingKeyword: search ?? secondaryMarketSearch,
                    sortField: 'lastPrice',
                    sortBy: sortBy
                  } as any)
                : {
                    listingKeyword: search ?? secondaryMarketSearch
                  }
            }
            actionHeader={'Actions'}
            noHeader={isTablet}
            activeSortLabel={sortBy !== undefined ? 'latestPrice' : undefined}
            paginationPlacement={isTablet ? 'top' : 'bottom'}
          >
            {isTablet
              ? (props: TableViewRendererProps<any>) => (
                  <SecondaryMarketList {...props} columns={columns} />
                )
              : undefined}
          </TableView>
        </ActiveElementContextWrapper>
      </Grid>
    </Grid>
  )
}
