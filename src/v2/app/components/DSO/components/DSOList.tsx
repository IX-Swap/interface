import React from 'react'
import {
  Box,
  Grid,
  TextField,
  TableBody,
  TableRow,
  TableCell,
  Button
} from '@material-ui/core'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { DSOCard } from 'v2/app/components/DSO/components/DSOCard'
import { Maybe, BaseFilter } from 'v2/types/util'
import User from 'v2/types/user'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'

interface DSOfferingsListProps {
  user: Maybe<User>
  filter: BaseFilter
  viewURL: string
}

export const DSO_LIST_QUERY_KEY = 'dsoList'

export const DSOList = (props: DSOfferingsListProps) => {
  const { user, filter, viewURL } = props
  const { routes } = useIssuanceRouter()

  return (
    <>
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item xs={11}>
            <TextField
              size='small'
              variant='outlined'
              placeholder='Search'
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <Button size='large' color='primary' variant='contained'>
              <AppRouterLink to={routes.create}>Add</AppRouterLink>
            </Button>
          </Grid>
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
                  <DSOCard dso={dso} viewURL={viewURL} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </TableView>
    </>
  )
}
