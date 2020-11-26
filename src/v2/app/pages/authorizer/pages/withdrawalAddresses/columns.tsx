import { TableColumn } from 'v2/types/util'
import { WithdrawalAddress } from 'v2/types/withdrawalAddress'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import { renderIndividualOrCompanyName } from 'v2/helpers/tables'
import { renderAddressColumn } from 'v2/helpers/rendering'

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
    label: 'Withdrawal Address',
    render: renderAddressColumn
  }
]
