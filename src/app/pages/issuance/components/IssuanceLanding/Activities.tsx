import React from 'react'
import { VSpacer } from 'components/VSpacer'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { TableView } from 'components/TableWithPagination/TableView'
import columns from './columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { investQueryKeys } from 'config/queryKeys'
import { useIssuanceRouter } from '../../router'
import { DSOActivity } from 'types/dso'

export const Activities = () => {
  // TODO: fix switching dso bug
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { params } = useIssuanceRouter()
  const url = `/issuance/dso/${userId}/${params.dsoId}/activities/list`

  return (
    <ChartWrapper title='Activities'>
      <VSpacer size='small' />
      <TableView<DSOActivity>
        uri={url}
        name={investQueryKeys.getCommitmentsByUserId(userId)}
        columns={columns}
      />
    </ChartWrapper>
  )
}
