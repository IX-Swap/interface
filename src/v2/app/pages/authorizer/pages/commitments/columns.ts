import { TableColumn } from 'v2/types/util'
import { Commitment } from 'v2/types/commitment'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import { renderAmount, renderIndividualOrCompanyName } from 'v2/helpers/tables'

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
  // {
  //   key: 'level',
  //   label: 'Level'
  // },
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
