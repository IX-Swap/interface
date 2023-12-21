import React from 'react'
import { Box } from '@mui/material'
import { selfCustodyColumns } from 'app/pages/accounts/pages/security-tokens/MyTokens/columns'
// import { TableView } from 'components/TableWithPagination/TableView'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { accountsURL } from 'config/apiURL'
import { digitalSecuritiesQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'

export const SelfCustodyList = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Box mt={2}>
      <TableView
        uri={accountsURL.balance.getAll(userId)}
        name={digitalSecuritiesQueryKeys.selfCustody(userId)}
        columns={selfCustodyColumns}
        filter={{ type: 'Security' }}
        paperProps={{
          style: {
            borderTop: 'none'
          }
        }}
      />
    </Box>
  )
}
