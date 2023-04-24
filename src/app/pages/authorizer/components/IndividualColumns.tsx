import React from 'react'
import { Box } from '@mui/material'
import { renderPriceWithCurrency } from 'app/pages/invest/components/DSOTable/columns'
import { renderListingStatus } from 'helpers/tables'
import { formatDateToMMDDYY } from 'helpers/dates'

import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'

const renderRiskReport = (rating?: string) => {
  return (
    <AuthorizableStatus
      status={rating ?? 'UNKNOWN'}
      compact={false}
      isNewKYCTheme
    />
  )
}

export const columns = [
  {
    label: <Box ml={2}>Date</Box>,
    key: 'createdAt',
    render: formatDateToMMDDYY
  },

  {
    label: <Box>Company Name</Box>,
    key: 'employer'
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

  // {
  //   label: <Box ml={2}>Risk Report</Box>,
  //   key: 'minimumInvestment'

  // },
  {
    label: <Box>KYC Status</Box>,
    key: 'status',
    render: renderListingStatus
  }

  // {
  //   label: <Box ml={2}>Issuer Status</Box>,
  //   key: 'status',
  //   render: renderListingStatus
  // },

  // {
  //   label: <Box ml={2}>Tenant Owner Status</Box>,
  //   key: 'status',
  //   render: renderListingStatus
  // }
]

export const compactColumns = [
  {
    label: 'Pair',
    key: '_id'
  },
  {
    label: 'Name',
    key: 'tokenName'
  },
  {
    key: 'pricePerUnit',
    label: 'Price',
    render: renderPriceWithCurrency
  },
  {
    key: 'minimumInvestment',
    label: 'Minimum',
    render: renderPriceWithCurrency
  },
  {
    key: 'capitalStructure',
    label: 'Capital Structure'
  },
  {
    key: 'distributionFrequency',
    label: 'Distribution'
  },
  {
    key: 'status',
    label: 'Status'
  }
]
