import { TableColumn } from 'types/util'
import { formatDateToMMDDYY } from 'helpers/dates'
import React from 'react'
import { renderRepresentativeName } from 'helpers/tables'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { Status } from 'ui/Status/Status'

const renderRiskReport = (rating?: string) => {
  return rating ?? 'Unknown'
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
    render: renderStatus
  },
  {
    key: 'declaredAsStatus',
    label: 'Issuer Status',
    render: (_, row) => renderInvestorStatus(row, 'issuer')
  },
  {
    key: 'declaredAsStatus',
    label: 'Tenant Owner Status',
    render: (_, row) => renderInvestorStatus(row, 'tenantOwner')
  }
]

export const compactColumns = [...columns.slice(1)]
