import { TableColumn } from 'types/util'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderIndividualOrCompanyName } from 'helpers/tables'
import { renderAddressColumn } from 'helpers/rendering'

export const columns: Array<TableColumn<WithdrawalAddress>> = [
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
    key: 'network.name',
    label: 'Blockchain Network'
  },
  {
    key: 'address',
    label: 'Blockchain Address',
    render: renderAddressColumn
  }
]
