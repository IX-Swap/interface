import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { CashBalance } from 'app/pages/accounts/components/CashBalance'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const HomePage = () => {
  const { isTablet } = useAppBreakpoints()

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader
          alignment={'center'}
          titleComponent={
            <CashBalance
              noSelect
              withoutBackground={!isTablet}
              title={'Total Estimated Value'}
            />
          }
        />
      </Grid>
    </Grid>
  )
}
