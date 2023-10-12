import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { ExportButton } from 'ui/ExportButton/ExportButton'
import { VSpacer } from 'components/VSpacer'
import { TokenTransactionsTable } from 'app/pages/admin/components/TokenTransactions/TokenTransactionsTable'
import { useExportTokenTransactions } from 'hooks/ledger/useExportTokenTransactions'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const TokenTransactions = () => {
  const theme = useTheme()
  const { getFilterValue } = useQueryFilter()
  const startDate = getFilterValue('fromDate') ?? undefined
  const endDate = getFilterValue('toDate') ?? undefined
  const { refetch } = useExportTokenTransactions(0, 500, startDate, endDate)

  return (
    <Grid container direction='column' gap={2} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Token Transactions' showBreadcrumbs />
      </Grid>
      <Grid item>
        <RootContainer>
          <Box
            p={3}
            bgcolor={theme.palette.backgrounds.light}
            sx={{
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row'
              },
              gap: 2,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography variant='h5'>Token Transactions</Typography>
              <VSpacer size='small' />
              <Typography variant='body1' color={'text.secondary'}>
                Keep track of tokens flowing into and out of the custody from
                user deposits, withdrawals, and issuances from primary listing.
              </Typography>
            </Box>
            <ExportButton
              sx={{ marginLeft: 'auto' }}
              onClick={async () => {
                await refetch()
              }}
            />
          </Box>
          <TokenTransactionsTable />
        </RootContainer>
      </Grid>
    </Grid>
  )
}
