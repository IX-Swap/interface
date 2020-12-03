import React from 'react'
import { Grid } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { DigitalSecurityOffering } from 'types/dso'
import { BaseFilter } from 'types/util'
import { DSOListTableBody } from 'app/components/DSO/components/DSOListTableBody'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { dsoQueryKeys } from 'config/queryKeys'
export interface DSOfferingsListProps {
  viewURL: string
  all?: boolean
  filter?: BaseFilter
}

export const DSOList = (props: DSOfferingsListProps) => {
  const { all = true, filter = {}, viewURL } = props
  const { user } = useAuth()
  const uri = all
    ? '/issuance/dso/list/approved'
    : `/issuance/dso/list/${getIdFromObj(user)}`

  return (
    <Grid item style={{ marginLeft: -16, marginRight: -16 }}>
      <TableView<DigitalSecurityOffering>
        filter={filter}
        columns={[]}
        bordered={false}
        name={dsoQueryKeys.getList}
        uri={uri}
      >
        {({ items }) => <DSOListTableBody viewURL={viewURL} items={items} />}
      </TableView>
    </Grid>
  )
}
