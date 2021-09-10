import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { investQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'
import { Commitment } from 'types/commitment'
import { commitmentsColumns } from 'app/pages/accounts/components/Commitments/commitmentsColumns'
import { CommitmentsTableActions } from 'app/pages/accounts/components/Commitments/CommitmentsTableActions'

export const CommitmentsTable: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <TableView<Commitment>
      uri={accountsURL.commitments.getAllByUserId(userId)}
      name={investQueryKeys.getCommitmentsByUserId(userId)}
      columns={commitmentsColumns}
      hasActions
      filter={{
        fundStatus: 'Not funded'
      }}
      actions={CommitmentsTableActions}
      themeVariant='primary'
    />
  )
}
