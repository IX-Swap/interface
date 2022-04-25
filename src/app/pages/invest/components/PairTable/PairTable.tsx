import { Table, TableBody, TableHead, TableRow } from '@mui/material'
import { PairTableCell } from 'app/pages/invest/components/PairTable/PairTableCell'
import { SortByFilter } from 'app/pages/invest/components/PairTable/PairTableFilter/SortByFilter'
import { PairTableRow } from 'app/pages/invest/components/PairTable/PairTableRow'
import { Pair } from 'app/pages/invest/hooks/useMarketList'
import { isEmptyString } from 'helpers/strings'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { useEffect } from 'react'
import { Waypoint } from 'react-waypoint'

export interface PairTableProps {
  data: Pair[]
  loadMore: () => void
}

export const PairTable = ({ data, loadMore }: PairTableProps) => {
  const { updateFilters, getFilterValue } = useQueryFilter()
  useEffect(() => {
    const sortByValue = getFilterValue('sortBy')
    if (isEmptyString(sortByValue)) {
      updateFilters({ sortBy: 'pair', orderBy: 'ASC' })
    }
    // eslint-disable-next-line
  }, [])

  if (data === undefined || data.length < 1) {
    return null
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <PairTableCell>
            <SortByFilter label='Pair' filterValue='pair' />
          </PairTableCell>
          <PairTableCell>
            <SortByFilter label='Last Price' filterValue='lastPrice' />
          </PairTableCell>
          <PairTableCell align='right'>
            <SortByFilter label='Change' filterValue='change' />
          </PairTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item: Pair) => (
          <PairTableRow key={item._id} item={item} />
        ))}
        <Waypoint onEnter={loadMore} />
      </TableBody>
    </Table>
  )
}
