import React from 'react'
import { Box } from '@mui/material'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderMarketType } from 'helpers/rendering'
import { HeadCellWithSort } from 'ui/UIKit/TablesKit/components/HeadCellWithSort/HeadCellWithSort'
import { renderListingStatus } from 'helpers/tables'

export const columns = [
  {
    label: <Box ml={2}>Pair</Box>,
    key: ['tokenSymbol,currency[0].symbol']
  },
  {
    label: 'Name',
    key: 'tokenName'
  },
  {
    label: <HeadCellWithSort label={'Date'} field={'createdAt'} />,
    key: 'createdAt',
    render: formatDateToMMDDYY
  },
  {
    label: 'Available Market',
    key: 'listingType',
    render: renderMarketType
  },
  {
    label: 'Status',
    key: 'status',
    render: renderListingStatus
  }
]

export const compactColumns = [
  {
    label: 'Pair',
    key: 'tokenSymbol'
  },
  {
    label: 'Name',
    key: 'tokenName'
  },
  {
    label: 'Date',
    key: 'createdAt',
    render: formatDateToMMDDYY
  },
  {
    label: 'Available Market',
    key: 'listingType',
    render: renderMarketType
  },
  {
    label: 'Status',
    key: 'status',
    render: renderListingStatus
  }
]
