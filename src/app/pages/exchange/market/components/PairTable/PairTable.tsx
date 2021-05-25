import React, { useEffect } from 'react'
import { Pair } from 'app/pages/exchange/market/hooks/useMarketList'
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import { PairTableCell } from 'app/pages/exchange/market/components/PairTable/PairTableCell'
import { PairTableRow } from 'app/pages/exchange/market/components/PairTable/PairTableRow'
import { SortByFilter } from 'app/pages/exchange/market/components/PairTable/PairTableFilter/SortByFilter'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export interface PairTableProps {
  data: Pair[]
}

export const PairTable = ({ data }: PairTableProps) => {
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
      </TableBody>
    </Table>
  )
}
