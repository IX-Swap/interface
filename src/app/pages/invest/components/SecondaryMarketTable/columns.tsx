import React from 'react'
import { Box } from '@mui/material'
import { TableColumn } from 'types/util'
import { formatMoney } from 'helpers/numbers'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { ReactComponent as SortActiveIcon } from './icons/sort_active.svg'
import { ReactComponent as SortDefaultIcon } from './icons/sort_default.svg'

export interface Order {
  createdAt: string
  pair: string
  side: string
  price: number
  amount: number
  total: number
  filled: number
}

export const PriceLabelWithSort = () => {
  const { isTablet } = useAppBreakpoints()
  const { getFilterValue, updateFilter, removeFilter } = useQueryFilter()
  const sortValue = getFilterValue('sortBy')
  const onClick = () => {
    switch (sortValue) {
      case undefined:
        updateFilter('sortBy', 'DESC')
        break
      case 'DESC':
        updateFilter('sortBy', 'ASC')
        break
      default:
        removeFilter('sortBy')
        break
    }
  }

  if (isTablet) {
    return <>Price</>
  }

  return (
    <Box
      onClick={onClick}
      display={'flex'}
      alignItems={'center'}
      style={{ cursor: 'pointer', userSelect: 'none' }}
    >
      Price
      <Box
        display={'flex'}
        flexDirection={'column'}
        style={{
          transform: `rotate(${sortValue === 'ASC' ? 0 : '180deg'})`
        }}
      >
        {sortValue === undefined ? <SortDefaultIcon /> : <SortActiveIcon />}
      </Box>
    </Box>
  )
}

export const renderLatestPrice = (val: number, row: any) => {
  return (
    <Box width={'100%'} height={'100%'}>
      {formatMoney(val, row.name.split('/')[1], true)}
    </Box>
  )
}

export const renderCreatedBy = (_: string, row: any) => row.listing.user.name

export const columns: Array<TableColumn<any>> = [
  {
    key: 'name',
    label: <Box sx={{ paddingLeft: { xs: 0, lg: 2 } }}>Pair</Box>
  },
  {
    label: 'Symbol',
    key: 'listing.tokenSymbol'
  },
  {
    key: 'listing.tokenName',
    label: 'Name'
  },
  {
    key: 'listing.createdBy',
    label: 'Issued By',
    align: 'left',
    headAlign: 'left',
    render: renderCreatedBy
  },

  {
    key: 'latestPrice',
    label: <PriceLabelWithSort />,
    align: 'left',
    headAlign: 'left',
    render: renderLatestPrice
  },
  {
    key: 'listing.marketType',
    label: 'Type'
  }
]
