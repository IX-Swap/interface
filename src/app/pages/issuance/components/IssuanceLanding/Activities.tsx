import React from 'react'
import { Box } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
// import { TableView } from 'components/TableWithPagination/TableView'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import columns from 'app/pages/issuance/components/IssuanceLanding/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { issuanceQueryKeys } from 'config/queryKeys'
import { DSOActivity } from 'types/dso'
import { issuanceURL } from 'config/apiURL'
import { isValidDSOId } from 'helpers/isValidDSOId'
import { useParams } from 'react-router-dom'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'

export const Activities = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const params = useParams<{ dsoId: string }>()

  return (
    <Box pt={10}>
      <FormSectionHeader title='Activities' />
      <VSpacer size='small' />
      <TableView<DSOActivity>
        uri={issuanceURL.dso.getActivitiesList(userId, params.dsoId)}
        name={issuanceQueryKeys.getActivitiesList(params.dsoId)}
        columns={columns}
        queryEnabled={isValidDSOId(params.dsoId)}
      />
    </Box>
  )
}
