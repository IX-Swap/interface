import { TableColumn } from 'types/util'
import { formatDateToMMDDYY } from 'helpers/dates'
import React from 'react'
import { renderRepresentativeName } from 'helpers/tables'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { AuthorizableStatus } from '../../components/AuthorizableStatus'

const renderRiskReport = (rating?: string) => {
  return (
    <AuthorizableStatus
      status={rating ?? 'UNKNOWN'}
      compact={false}
      isNewTheme
    />
  )
}

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
  { key: 'cynopsis.riskRating', label: 'Risk Report', render: renderRiskReport }
]
