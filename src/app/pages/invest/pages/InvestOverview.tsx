import React from 'react'
import { Grid, Button, Typography } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { SecondaryMarketTable } from 'app/pages/invest/components/SecondaryMarketTable/SecondaryMarketTable'
import { OverviewPageFilters } from 'app/pages/invest/components/OverviwPageFilters'
import { PrimaryOfferings } from 'app/pages/invest/components/PrimaryOfferings'
import { OTCMarket } from 'app/pages/invest/components/OTCMarkets'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { investQueryKeys } from 'config/queryKeys'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import BannerDesktop from '../../../../assets/images/ixape.png'
import BannerMobile from '../../../../assets/images/ixape_mobile.png'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { accountsURL } from 'config/apiURL'

export const InvestOverview = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { isMobile } = useAppBreakpoints()

  const { total } = useTableWithPagination({
    queryKey: investQueryKeys.getCommitmentsByUserId(userId),
    uri: accountsURL.commitments.getAllByUserId(userId),
    queryEnabled: true,
    defaultFilter: { fundStatus: 'Not funded' },
    defaultRowsPerPage: 5
  })

  return (
    <>
      <PageHeader
        title={'Overview'}
        mainWrapperSX={{
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'initial', md: 'center' }
        }}
        endComponent={
          <Grid
            container
            sx={theme => ({
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: { xs: 'initial', md: 'flex-end' },
              px: { xs: 2, md: 0 },
              py: { xs: 2, md: 0 },
              borderRadius: { xs: 2, md: 0 },
              backgroundColor: { xs: '#ffffff', md: 'inherit' }
            })}
          >
            <Grid item>
              <OverviewPageFilters />
            </Grid>

            <Grid item sx={{ ml: { md: 2 }, mt: { xs: 2, md: 0 } }}>
              <Button
                component={AppRouterLinkComponent}
                to={AccountsRoute.commitments}
                color='primary'
                variant='outlined'
                size='large'
                disableElevation
                style={{ paddingRight: 0, paddingLeft: 0 }}
                sx={{
                  display: 'inline-block',
                  width: { xs: '100%', md: 214 },
                  height: 50,
                  textAlign: 'center'
                }}
              >
                My Commitments{' '}
                <Typography display={'inline'} color={'text.secondary'}>
                  {total}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        }
      />
      <RootContainer>
        <Grid container direction={'column'} spacing={6}>
          <Grid item sx={{ mt: { md: 3 } }}>
            <PrimaryOfferings />
          </Grid>

          <Grid item>
            <OTCMarket />
          </Grid>

          <Grid item container direction='column' spacing={4}>
            <Grid item>
              <Typography variant='h4'>Secondary Market</Typography>
            </Grid>
            <Grid item style={{ maxWidth: '100%' }}>
              <SecondaryMarketTable />
            </Grid>
          </Grid>

          <Grid item>
            <img
              width={'100%'}
              src={isMobile ? BannerMobile : BannerDesktop}
              alt={'Banner'}
            />
          </Grid>
        </Grid>
      </RootContainer>
    </>
  )
}
