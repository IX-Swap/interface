import { TableColumn } from 'types/util'
import { formatDateToMMDDYY } from 'helpers/dates'
import React from 'react'
import { renderRepresentativeName } from 'helpers/tables'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { Status } from 'ui/Status/Status'
import { Actions } from 'app/pages/authorizer/components/Actions'
import { Box } from '@mui/material'

const renderRiskReport = (rating?: string) => {
  return rating ?? 'Unknown'
}

const renderColumnWithApproval = (row: object, status: string) => {
  return (
    <Box display={'flex'} justifyContent={''}>
      <Status label={status} type={status.toLowerCase()} />
      {status === 'Submitted' && (
        <Actions
          item={row}
          cacheQueryKey={''}
          featureCategory='corporates/accreditation'
        />
      )}
    </Box>
  )
}

const renderType = (type?: string) =>
  typeof type !== 'undefined' && type.charAt(0).toUpperCase() + type.slice(1)

export const columns: Array<TableColumn<CorporateIdentity>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'companyLegalName',
    label: 'Company Name'
  },
  {
    key: 'companyAddress.country',
    label: 'Country'
  },
  {
    key: 'representatives[0].firstname',
    label: 'Representative',
    render: renderRepresentativeName
  },
  {
    key: 'type',
    label: 'Type',
    render: renderType
  },
  {
    key: 'cynopsis.riskRating',
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
