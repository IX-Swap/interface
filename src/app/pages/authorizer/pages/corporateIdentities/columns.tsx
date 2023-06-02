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
  role?: string
) => {
  return (
    <Box display={'flex'} justifyContent={''}>
      {typeof role !== 'undefined'
        ? renderRoleStatus(row, role)
        : renderStatus(row, status)}
    </Box>
  )
}

const renderRoleStatus = (row: any, role: string) => {
  let label = 'N/A'
  let status = 'Draft'

  if (
    typeof row.declaredAs !== 'undefined' &&
    Boolean(row.declaredAs.includes(role)) &&
    typeof row.declaredAsStatus !== 'undefined' &&
    Boolean(role in row.declaredAsStatus)
  ) {
    label = row.declaredAsStatus[role]
    status = row.declaredAsStatus[role]
  }

  return renderStatus(row, status, label, 'corporates/role', role)
}

const renderStatus = (
  row: object,
  status: string,
  label?: string,
  featureCategory?: string,
  role?: string
) => (
  <>
    <Status label={label ?? status} type={status.toLowerCase()} />
    <Actions
      item={row}
      cacheQueryKey={''}
      featureCategory={featureCategory}
      investorRole={role}
      statusFieldName={
        typeof role !== 'undefined' ? `declaredAsStatus.${role}` : 'status'
      }
    />
  </>
)

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
    key: 'cynopsis',
    label: 'Risk Report',
    render: renderRiskReport
  },
  {
    key: 'status',
    label: 'KYC Status',
    render: (status, row) => renderColumnWithApproval(row, status)
  }
  //   {
  //     key: 'declaredAsStatus',
  //     label: 'Issuer Status',
  //     render: (status, row) => renderColumnWithApproval(row, status, 'issuer')
  //   },
  //   {
  //     key: 'declaredAsStatus',
  //     label: 'Client Status',
  //     render: (status, row) =>
  //       renderColumnWithApproval(row, status, 'tenantOwner')
  //   }
]

export const compactColumns = [...columns.slice(1)]
