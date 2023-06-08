import React from 'react'
import { Box } from '@mui/material'
import { TableColumn } from 'types/util'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderRepresentativeName, renderRiskReport } from 'helpers/tables'
import { Status } from 'ui/Status/Status'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
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

  return renderStatus(row, status, label, 'corporates/accreditation', true)
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

// const renderType = (type?: string) =>
//   typeof type !== 'undefined' && type.charAt(0).toUpperCase() + type.slice(1)

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
    key: 'user.email',
    label: 'Email'
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
  //   {
  //     key: 'type',
  //     label: 'Type',
  //     render: renderType
  //   },
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
