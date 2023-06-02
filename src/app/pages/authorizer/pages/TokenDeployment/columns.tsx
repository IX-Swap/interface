import React from 'react'
import { TableColumn } from 'types/util'
import { DigitalSecurityOffering } from 'types/dso'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderAmount, renderMinimumInvestment } from 'helpers/tables'
import { Status } from 'ui/Status/Status'
import { Actions } from 'app/pages/authorizer/components/Actions'
import { Box } from '@mui/material'

const renderColumnWithApproval = (row: object, status: string) => {
  return (
    <Box display={'flex'} justifyContent={''}>
      <Status label={status} type={status.toLowerCase()} />
      <Actions
        item={row}
        cacheQueryKey={''}
        statusFieldName={'deploymentStatus'}
      />
    </Box>
  )
}

export const columns: Array<TableColumn<DigitalSecurityOffering>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'tokenName',
    label: 'Security Token'
  },
  {
    key: 'capitalStructure',
    label: 'Capital Structure'
  },
  {
    align: 'right',
    headAlign: 'right',
    key: 'pricePerUnit',
    label: 'Unit Price',
    render: renderAmount
  },
  {
    align: 'right',
    headAlign: 'right',
    key: 'minimumInvestment',
    label: 'Minimum Investment',
    render: renderMinimumInvestment
  },
  {
    key: 'marketType',
    label: 'Market Type'
  },
  {
    key: 'deploymentStatus',
    label: 'Status',
    render: (status, row) => renderColumnWithApproval(row, status)
  }
]