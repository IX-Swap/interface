import React, { useEffect } from 'react'
import { Pair } from 'app/pages/exchange/hooks/useMarketList'
import { Table, TableBody, TableHead, TableRow } from '@mui/material'
import { PairTableCell } from 'app/pages/exchange/components/PairTable/PairTableCell'
import { PairTableRow } from 'app/pages/exchange/components/PairTable/PairTableRow'
import { SortByFilter } from 'app/pages/exchange/components/PairTable/PairTableFilter/SortByFilter'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { Waypoint } from 'react-waypoint'

export interface PairTableProps {
  data: Pair[]
  loadMore: () => void
}

export const PairTable = ({ data, loadMore }: PairTableProps) => {
  const { updateFilters } = useQueryFilter()
  useEffect(() => {
    updateFilters({ sortBy: 'pair', orderBy: 'ASC' })
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
