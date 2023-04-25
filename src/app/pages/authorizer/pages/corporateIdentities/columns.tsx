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

const renderColumnWithApproval = (
  row: object,
  status: string,
  investorType?: string
) => {
  return (
    <Box display={'flex'} justifyContent={''}>
      {typeof investorType !== 'undefined'
        ? renderInvestorStatus(status, investorType)
        : renderStatus(status)}
      {status === 'Submitted' && <Actions item={row} cacheQueryKey={''} />}
    </Box>
  )
}

const renderStatus = (status: string) => {
  return <Status label={status} type={status.toLowerCase()} />
}

const renderInvestorStatus = (row: any, investorType: string) => {
  if (
    typeof row.declaredAs !== 'undefined' &&
    Boolean(row.declaredAs.includes(investorType))
  ) {
    return renderStatus(row.declaredAsStatus[investorType])
  }

  return <Status label='N/A' type='draft' />
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
    key: 'status',
    label: 'KYC Status',
    render: (status, row) => renderColumnWithApproval(row, status)
  },
  {
    key: 'declaredAsStatus',
    label: 'Issuer Status',
    render: (status, row) => renderColumnWithApproval(row, status, 'issuer')
  },
  {
    key: 'declaredAsStatus',
    label: 'Tenant Owner Status',
    render: (status, row) =>
      renderColumnWithApproval(row, status, 'tenantOwner')
  }
]

export const compactColumns = [...columns.slice(1)]
