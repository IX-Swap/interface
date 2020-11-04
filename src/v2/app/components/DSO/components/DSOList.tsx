import React from 'react'
import { Grid } from '@material-ui/core'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { BaseFilter } from 'v2/types/util'
import { DSOListTableBody } from 'v2/app/components/DSO/components/DSOListTableBody'
import { getIdFromObj } from 'v2/helpers/strings'
import { useAuth } from 'v2/hooks/auth/useAuth'

export interface DSOfferingsListProps {
  viewURL: string
  all?: boolean
  filter?: BaseFilter
}

export const DSO_LIST_QUERY_KEY = 'dsoList'

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
        name={DSO_LIST_QUERY_KEY}
        uri={uri}
      >
        {({ items }) => <DSOListTableBody viewURL={viewURL} items={items} />}
      </TableView>
    </Grid>
  )
}
