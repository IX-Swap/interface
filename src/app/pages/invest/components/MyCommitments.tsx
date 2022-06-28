import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { Commitment } from 'types/commitment'
import columns from 'app/pages/invest/components/columns'
import { Actions } from 'app/pages/invest/components/Actions'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { privateClassNames } from 'helpers/classnames'
import { investQueryKeys } from 'config/queryKeys'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export const MyCommitments = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='My Investments' />
      </Grid>

      <RootContainer>
        <Grid item className={privateClassNames()}>
          <TableView<Commitment>
            uri={`/issuance/commitments/list/${userId}`}
            name={investQueryKeys.getCommitmentsByUserId(userId)}
            columns={columns}
            hasActions
            actions={Actions}
          />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
