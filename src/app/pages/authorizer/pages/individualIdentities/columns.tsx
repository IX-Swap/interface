import React from 'react'
import { Box } from '@mui/material'
import { TableColumn } from 'types/util'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderIncome, renderLastName, renderRiskReport } from 'helpers/tables'
import { Status } from 'ui/Status/Status'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { Actions } from 'app/pages/authorizer/components/Actions'

const renderColumnWithApproval = (
  row: object,
  status: string,
  isAccreditation: boolean = false
) => {
  return (
    <Box display={'flex'} justifyContent={''}>
      {isAccreditation
        ? renderAccreditationStatus(row)
        : renderStatus(row, status)}
    </Box>
  )
}

const renderAccreditationStatus = (row: any) => {
  let label = 'N/A'
  let status = 'Draft'

  if (typeof row.accreditationStatus !== 'undefined') {
    label = row.accreditationStatus
    status = row.accreditationStatus
  }

  return renderStatus(row, status, label, 'individuals/accreditation', true)
}

const renderStatus = (
  row: object,
  status: string,
  label?: string,
  featureCategory?: string,
  isAccreditation: boolean = false
) => (
  <>
    <Status label={label ?? status} type={status.toLowerCase()} />
    <Actions
      item={row}
      cacheQueryKey={''}
      featureCategory={featureCategory}
      statusFieldName={isAccreditation ? 'accreditationStatus' : 'status'}
    />
  </>
)

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
    key: 'user.email',
    label: 'Email'
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
  },
  {
    key: 'accreditationStatus',
    label: 'Accreditation Status',
    render: (status, row) => renderColumnWithApproval(row, status, true)
  }
]

export const compactColumns = [...columns.slice(1)]
