import { TableColumn } from 'types/util'
import { formatDateToMMDDYY } from 'helpers/dates'
import React from 'react'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { renderIncome, renderLastName, renderRiskReport } from 'helpers/tables'
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
        featureCategory='individuals/accreditation'
        statusFieldName={'accreditationStatus'}
      />
    </Box>
  )
}

export const columns: Array<TableColumn<IndividualIdentity>> = [
  {
    key: 'createdAt',
    label: 'Date',
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
    key: 'accreditationStatus',
    label: 'Accreditation Status',
    render: (status, row) => renderColumnWithApproval(row, status)
  }
]

export const compactColumns = [...columns.slice(1)]
