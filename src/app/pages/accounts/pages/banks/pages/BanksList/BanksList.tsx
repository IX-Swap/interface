import React from 'react'
import { Box, Grid } from '@mui/material'
import { Header } from 'app/pages/accounts/pages/banks/pages/BanksList/Header'
import { Table } from 'app/pages/accounts/pages/banks/pages/BanksList/Table'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { useStyles } from 'app/pages/accounts/pages/banks/pages/BanksList/BanksList.styles'

export const BanksList: React.FC = () => {
  const classes = useStyles()
  const { isTablet } = useAppBreakpoints()
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        {!isTablet && (
          <PageHeader
            data-testid='desktop-header'
            title='Cash Accounts'
            endComponent={<Header />}
          />
        )}
        {isTablet && (
          <Grid
            item
            container
            flexDirection={'row'}
            mt={3}
            data-testid='mobile-header'
          >
            <Grid item xs={12}>
              <PageHeader
                title='Cash Accounts'
                showBreadcrumbs={false}
                styled={false}
                variant='h3'
              />
            </Grid>
            <Grid item xs={12} px={2} mt={3}>
              <Box className={classes.buttonWrapper}>
                <Header />
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>
      <RootContainer>
        <Grid container spacing={{ xs: 2, md: 6 }}>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </RootContainer>
    </Grid>
  )
}
