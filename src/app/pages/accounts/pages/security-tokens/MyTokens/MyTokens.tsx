import React from 'react'
import { Button, Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
// import { DSTabs } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTabs'
import { SecurityTokensTable } from 'app/pages/accounts/pages/security-tokens/MyTokens/SecurityTokensTable'
import { DSRoute } from 'app/pages/accounts/pages/security-tokens/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { RootContainer } from 'ui/RootContainer'
import { useAppState } from 'app/hooks/useAppState'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { NoInvestments } from './NoInvestments'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { TableTabsView } from 'app/components/TableTabsView/TableTabsView'
import { DepositsTable } from './DepositsTable/DepositsTable'
import { VSpacer } from 'components/VSpacer'

export const MyTokens: React.FC = () => {
  const { tableHasData } = useAppState()
  const { removeFilters } = useQueryFilter()

  const tabs = [
    {
      panel: <DepositsTable />,
      label: 'Withdraw'
    },
    {
      panel: <DepositsTable />,
      label: 'Deposit'
    }
  ]

  const handleChange = (event: object, value: any) => {
    removeFilters(['search', 'toDate', 'fromDate', 'status'])
  }

  return (
    <Grid container spacing={3} style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader
          title='My Tokens'
          endComponent={
            <Grid
              item
              xs={12}
              container
              spacing={1}
              justifyContent='flex-end'
              mb={1}
            >
              <Grid item>
                <Button
                  component={AppRouterLinkComponent}
                  variant='outlined'
                  color='primary'
                  to={DSRoute.deposit}
                >
                  Deposit
                </Button>
              </Grid>

              {tableHasData && (
                <Grid item>
                  <Button
                    component={AppRouterLinkComponent}
                    variant='outlined'
                    color='primary'
                    to={DSRoute.withdraw}
                  >
                    Withdraw
                  </Button>
                </Grid>
              )}
            </Grid>
          }
        />
      </Grid>
      <RootContainer padding={0}>
        <Grid item xs={12} mt={2} ml={1.5}>
          {/* <DSTabs /> */}
          {tableHasData ? (
            <>
              <SecurityTokensTable hasTopBorder={false} />
              <VSpacer size='medium'></VSpacer>
              <TableTabsView
                tabs={tabs}
                onChange={handleChange}
                variant='tabsOnly'
              />
            </>
          ) : (
            <FieldContainer>
              <NoInvestments />
            </FieldContainer>
          )}
        </Grid>
      </RootContainer>
    </Grid>
  )
}
