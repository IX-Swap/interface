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

export const PrimaryOfferings = () => {
  const classes = useStyles()
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

  if (status === 'loading' || items.length === undefined) {
    return null
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

      <Grid container item wrap={'wrap'} className={classes.container}>
        {(items as DigitalSecurityOffering[]).slice(0, 3).map((dso, i) => (
          <DSOCard
            type={'Primary'}
            data={dso}
            viewURL={InvestRoute.view}
            key={dso._id}
          />
        ))}
      </Grid>
    </Grid>
  )
}
