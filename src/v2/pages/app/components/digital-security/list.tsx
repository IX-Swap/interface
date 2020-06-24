import React, { useState } from 'react'
import { Box, Grid, TextField, TableBody, TableRow, TableCell } from '@material-ui/core'
import TableWithPagination from '../../../../components/table-with-pagination'
import { Dso } from '../../../../types/dso'
import DsoOfferingCard from './card'
import { debounce } from 'lodash'
import { BaseFilter } from '../../../../types/util'

interface OfferingsListProps {
  filter?: BaseFilter
  user?: string
  handleRowClick: (row: Dso) => void
}

const OfferingsList = ({ user = undefined, filter = { status: '' }, handleRowClick }: OfferingsListProps) => {
  const [search, setSearch] = useState('')
  const [_onSearch] = useState(() =>
    debounce<any>((evt: React.ChangeEvent<HTMLInputElement>) => setSearch(evt.target.value), 500)
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
            style={{ flexGrow: 1 }}
          />
        </Grid>
      </Box>

      <TableWithPagination
        filter={{ ...filter, search }}
        columns={[]}
        bordered={false}
        name={`invest-${user ?? 'invest'}`}
        uri={`/issuance/dso/list/${user ?? ''}`}
      >
        {
          ({ items }: { items: Dso[] }) => {
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
          }
        }
      </TableWithPagination>
    </>
  )
}

export default OfferingsList
