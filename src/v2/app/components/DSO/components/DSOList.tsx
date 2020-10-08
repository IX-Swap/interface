import React from 'react'
import { Grid } from '@material-ui/core'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { Maybe, BaseFilter } from 'v2/types/util'
import User from 'v2/types/user'
import { DSOListTableBody } from 'v2/app/components/DSO/components/DSOListTableBody'

export interface DSOfferingsListProps {
  user: Maybe<User>
  filter: BaseFilter
  viewURL: string
}

export const DSO_LIST_QUERY_KEY = 'dsoList'

export const DSOList = (props: DSOfferingsListProps) => {
  const { user, filter, viewURL } = props

  return (
    <Grid item style={{ marginLeft: -16, marginRight: -16 }}>
      <TableView<DigitalSecurityOffering>
        filter={{ ...filter, search: '' }}
        columns={[]}
        bordered={false}
        name={DSO_LIST_QUERY_KEY}
        uri={`/issuance/dso/list/${user?._id ?? ''}`}
      >
        {({ items }) => <DSOListTableBody viewURL={viewURL} items={items} />}
      </TableView>
    </Grid>
  )
}
