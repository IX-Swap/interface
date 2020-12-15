import { TableColumn } from 'types/util'
import { Commitment } from 'types/commitment'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderAmount, renderIndividualOrCompanyName } from 'helpers/tables'

export const columns: Array<TableColumn<Commitment>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'identity.individual.firstName',
    label: 'Name',
    render: renderIndividualOrCompanyName
  },
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'dso.tokenName',
    label: 'Digital Security'
  },
  {
    key: 'dso.issuerName',
    label: 'Issuer'
  },
  {
    key: 'totalAmount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right',
    render: renderAmount
  }
]
