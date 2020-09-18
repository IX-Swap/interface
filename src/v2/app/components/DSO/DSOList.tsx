import React from 'react'
import {
  Box,
  Grid,
  TextField,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { DSOCard } from 'v2/app/components/DSO/DSOCard'
import { Maybe, BaseFilter } from 'v2/types/util'
import User from 'v2/types/user'

interface DSOfferingsListProps {
  user: Maybe<User>
  filter: BaseFilter
}

export const DSO_LIST_QUERY_KEY = 'dsoList'

export const DSOList = (props: DSOfferingsListProps) => {
  const { user, filter } = props

  return (
    <>
      <Box mb={4}>
        <Grid container style={{ padding: '0 16px' }}>
          <TextField
            variant='outlined'
            placeholder='Search'
            style={{
              flexGrow: 1
            }}
          />
        </Grid>
      </Box>

      <TableView<DigitalSecurityOffering>
        filter={{ ...filter, search: '' }}
        columns={[]}
        bordered={false}
        name={DSO_LIST_QUERY_KEY}
        uri={`/issuance/dso/list/${user?._id ?? ''}`}
      >
        {({ items }) => (
          <TableBody>
            {items.map(dso => (
              <TableRow key={dso._id}>
                <TableCell style={{ borderBottom: 'none' }}>
                  <DSOCard dso={dso} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </TableView>
    </>
  )
}
