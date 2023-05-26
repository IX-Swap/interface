import React from 'react'
import { TableColumn } from 'types/util'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderIncome, renderLastName, renderRiskReport } from 'helpers/tables'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { Box } from '@mui/material'
import { Status } from 'ui/Status/Status'
import { Actions } from 'app/pages/authorizer/components/Actions'

const renderColumnWithApproval = (row: object, status: string) => {
  return (
    <Box display={'flex'} justifyContent={''}>
      <Status label={status} type={status.toLowerCase()} />
      <Actions item={row} cacheQueryKey={''} />
    </Box>
  )
}

export const columns: Array<TableColumn<IndividualIdentity>> = [
  {
    key: 'createdAt',
    label: 'Date of Application',
    render: formatDateToMMDDYY
  },
  {
    key: 'firstName',
    label: 'Name',
    render: renderLastName
  },
  {
    key: 'address.country',
    label: 'Country'
  },
  {
    key: 'occupation',
    label: 'Occupation'
  },
  {
    key: 'annualIncome',
    label: 'Annual Income',
    render: renderIncome
  },
  {
    key: 'cynopsis',
    label: 'Risk Report',
    render: renderRiskReport
  },
  {
    key: 'status',
    label: 'KYC Status',
    render: (status, row) => renderColumnWithApproval(row, status)
  }
]

export const compactColumns = [...columns.slice(1)]
