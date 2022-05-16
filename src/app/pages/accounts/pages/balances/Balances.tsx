import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { AssetBalance } from 'types/balance'
import { columns } from 'app/pages/accounts/pages/balances/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { balanceQueryKeys } from 'config/queryKeys'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@mui/material'
import { RootContainer } from 'ui/RootContainer'

export const Balances: React.FC = () => {
  const { user } = useAuth()

  return (
    <Grid container direction='column' spacing={2} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Asset Balances' />
      </Grid>
      <RootContainer>
        <Grid item>
          <TableView<AssetBalance>
            uri={`/accounts/currency-balance/${getIdFromObj(user)}`}
            name={balanceQueryKeys.getByUserId(getIdFromObj(user))}
            filter={{ type: 'Currency' }}
            columns={columns}
          />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
