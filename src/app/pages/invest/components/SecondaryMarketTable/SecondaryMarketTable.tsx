import React from 'react'
import { Button, Grid } from '@mui/material'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { Actions } from 'app/pages/invest/components/SecondaryMarketTable/Actions'
import { exchange as exchangeURL } from 'config/apiURL'
import { columns } from 'app/pages/invest/components/SecondaryMarketTable/columns'
import { SearchFilter } from 'app/components/SearchFilter'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useTheme } from '@mui/material/styles'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { useOutlinedInputStyles } from 'app/pages/invest/components/OverviwPageFilters'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { NoOffers } from 'app/pages/invest/components/NoOffers/NoOffers'
import { SecondaryMarketList } from 'app/pages/invest/components/SecondaryMarketTable/SecondaryMarketList'
import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'

export const SecondaryMarketTable = () => {
  const outlinedInputClasses = useOutlinedInputStyles()
  const theme = useTheme()
  const { isMobile, isMiniLaptop } = useAppBreakpoints()
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search')
  const secondaryMarketSearch = getFilterValue('secondaryMarketSearch')

  const { items, isLoading } = useTableWithPagination({
    queryKey: exchangeQueryKeys.marketList,
    uri: exchangeURL.marketList,
    defaultFilter: { listingKeyword: search ?? secondaryMarketSearch } as any,
    queryEnabled: true,
    defaultRowsPerPage: undefined
  })

  if (!isLoading && items.length < 1) {
    return <NoOffers />
  }

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
          <SearchFilter
            inputSX={{
              borderRadius: 2,
              height: 50,
              width: { xs: '100%' }
            }}
            classes={outlinedInputClasses}
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
      <Grid
        item
        xs={12}
        sx={{
          overflowX: { xs: 'initial', lg: 'scroll' },
          // overflowX: 'scroll',
          maxWidth: '100%'
        }}
      >
        <ActiveElementContextWrapper>
          <TableView
            uri={exchangeURL.marketList}
            name={exchangeQueryKeys.marketList}
            columns={columns}
            actions={Actions}
            filter={{ listingKeyword: search ?? secondaryMarketSearch } as any}
            actionHeader={'Actions'}
            noHeader={isMiniLaptop}
            paginationPlacement={isMiniLaptop ? 'top' : 'bottom'}
          >
            {isMiniLaptop
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
