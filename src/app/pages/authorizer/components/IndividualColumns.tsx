import React from 'react'
import { Box } from '@mui/material'
import { renderListingStatus } from 'helpers/tables'
import { formatDateToMMDDYY } from 'helpers/dates'

import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'

const renderRiskReport = (rating?: string) => {
  return <AuthorizableStatus status={rating ?? 'UNKNOWN'} compact={false} />
}

export const columns = [
  {
    label: <Box ml={2}>Date</Box>,
    key: 'createdAt',
    render: formatDateToMMDDYY
  },

  {
    label: <Box>Profile Name</Box>,
    key: 'user.name'
  },

  {
    label: <Box>Country</Box>,
    key: 'nationality'
  },
  {
    label: <Box>Representative</Box>,
    key: 'nationality'
    // render: renderDSOLogo
  },

  {
    label: <Box>Type</Box>,
    key: 'user.accountType'
  },

  {
    label: <Box ml={1}>Risk Report</Box>,
    key: 'cynopsis.riskRating',
    render: renderRiskReport
  },

  {
    label: <Box>KYC Status</Box>,
    key: 'status',
    render: renderListingStatus
  }
]

export const compactColumns = [
  {
    label: <Box ml={2}>Date</Box>,
    key: 'createdAt',
    render: formatDateToMMDDYY
  },

  {
    label: <Box>Profile Name</Box>,
    key: 'user.name'
  },

  {
    label: <Box>Country</Box>,
    key: 'nationality'
  },
  {
    label: <Box>Representative</Box>,
    key: 'nationality'
  },

  {
    label: <Box>Type</Box>,
    key: 'user.accountType'
  },

  {
    label: <Box ml={1}>Risk Report</Box>,
    key: 'cynopsis.riskRating',
    render: renderRiskReport
  },
  {
    label: <Box>KYC Status</Box>,
    key: 'status',
    render: renderListingStatus
  }
]
