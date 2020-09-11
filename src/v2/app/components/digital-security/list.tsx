import React, { useState } from 'react'
import {
  Box,
  Grid,
  TextField,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { Dso } from 'v2/types/dso'
import DsoOfferingCard from './card'
import { debounce } from 'lodash'
import { BaseFilter } from 'v2/types/util'

interface OfferingsListProps {
  filter?: BaseFilter
  user?: string
  handleRowClick: (row: Dso) => void
  children?: React.ReactNode
}

const OfferingsList = ({
  user = undefined,
  filter = { status: '' },
  handleRowClick,
  children
}: OfferingsListProps) => {
  const [search, setSearch] = useState('')
  const [_onSearch] = useState(() =>
    debounce<any>(
      (evt: React.ChangeEvent<HTMLInputElement>) => setSearch(evt.target.value),
      500
    )
  )

  const onSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.persist()
    _onSearch(evt)
  }

  return (
    <>
      <Box mb={4}>
        <Grid container style={{ padding: '0 16px' }}>
          <TextField
            variant='outlined'
            placeholder='Search'
            onChange={onSearch}
            style={{
              flexGrow: 1,
              marginRight: children !== undefined ? '16px' : '0'
            }}
          />
          {children ?? null}
        </Grid>
      </Box>

      <TableView
        filter={{ ...filter, search }}
        columns={[]}
        bordered={false}
        name={`invest-${user ?? 'invest'}`}
        uri={`/issuance/dso/list/${user ?? ''}`}
      >
        {({ items }: { items: Dso[] }) => {
          return (
            <TableBody>
              {items.map((dso: Dso) => (
                <TableRow key={dso._id}>
                  <TableCell style={{ borderBottom: 'none' }}>
                    <DsoOfferingCard dso={dso} onClickView={handleRowClick} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )
        }}
      </TableView>
    </>
  )
}

export default OfferingsList
