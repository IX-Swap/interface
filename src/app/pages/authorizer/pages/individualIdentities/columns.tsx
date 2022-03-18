import React from 'react'
import { TableColumn } from 'types/util'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderIncome, renderLastName } from 'helpers/tables'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'

const renderRiskReport = (rating?: string) => {
  return (
    <AuthorizableStatus
      status={rating ?? 'UNKNOWN'}
      compact={false}
      isNewTheme
    />
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
  { key: 'cynopsis.riskRating', label: 'Risk Report', render: renderRiskReport }
]
