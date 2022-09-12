import React from 'react'
import { Box } from '@mui/material'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderMarketType } from 'helpers/rendering'
import { HeadCellWithSort } from 'ui/UIKit/TablesKit/components/HeadCellWithSort/HeadCellWithSort'
import { renderListingStatus } from 'helpers/tables'

export const columns = [
  {
    label: <Box ml={2}>Pair</Box>,
    key: 'tokenSymbol'
  },
  {
    label: 'Name',
    key: 'tokenName'
  },
  // TODO What's date? CreatedAt? LaunchDate? UpdatedAt?
  {
    label: <HeadCellWithSort label={'Date'} field={'launchDate'} />,
    key: 'launchDate',
    render: formatDateToMMDDYY
  },
  {
    label: 'Available Market',
    key: 'marketType',
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
  // TODO What's date? CreatedAt? LaunchDate? UpdatedAt?
  {
    label: 'Date',
    key: 'launchDate',
    render: formatDateToMMDDYY
  },
  {
    label: 'Available Market',
    key: 'marketType',
    render: renderMarketType
  },
  {
    label: 'Status',
    key: 'status',
    render: renderListingStatus
  }
]
