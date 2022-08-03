import { Box, Grid } from '@mui/material'
import { BackLink } from 'app/components/BackLink/BackLink'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { WithdrawForm } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawForm'
import { Setup } from 'app/pages/accounts/pages/withdraw/components/Setup'
import { useStyles } from 'app/pages/accounts/pages/withdraw/components/Withdraw.styles'
import React from 'react'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const Withdraw = () => {
  const { container, formWrapper, headerContainer } = useStyles()
  const { isTablet } = useAppBreakpoints()
  return (
    <Grid
      container
      direction='column'
      className={container}
      spacing={{ xs: 0, sm: 3 }}
      paddingBottom={3}
    >
      <Grid item>
        <Box className={headerContainer}>
          <PageHeader
            title='Cash Withdrawal'
            styled={false}
            variant='h1'
            alignment='center'
            showBreadcrumbs={false}
            startComponent={
              <BackLink to={AccountsRoute.cash} title='Back to Cash page' />
            }
            titleStyle={{ fontSize: isTablet ? 24 : 32, height: 'initial' }}
            mainWrapperSX={{
              flexDirection: { xs: 'column-reverse', md: 'row' },
              alignItems: { xs: 'initial', md: 'center' }
            }}
          />
        </Box>
      </Grid>
      <Grid item container justifyContent={'center'}>
        <Grid item className={formWrapper}>
          <WithdrawForm>
            <Setup />
          </WithdrawForm>
        </Grid>
      </Grid>
    </Grid>
  )
}
