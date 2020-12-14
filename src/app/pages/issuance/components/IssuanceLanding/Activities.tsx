import React from 'react'
import { VSpacer } from 'components/VSpacer'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'

import { TableView } from 'components/TableWithPagination/TableView'
import { Commitment } from 'types/commitment'
import columns from './columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { investQueryKeys } from 'config/queryKeys'

// TODO: Remove dummy data and replace with correct URL
export const Activities = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <ChartWrapper title='Activities'>
      <VSpacer size='small' />
      <TableView<Commitment>
        uri={`/issuance/commitments/list/${userId}`}
        name={investQueryKeys.getCommitmentsByUserId(userId)}
        columns={columns}
      />
    </ChartWrapper>
  )
}
