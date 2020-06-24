import { TableColumn } from '../../../../../types/util'
import { Listing } from '../../../../../types/listing'

export const columns: Array<TableColumn<Listing>> = [
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'asset.name',
    label: 'Asset Name'
  },
  {
    key: 'companyName',
    label: 'Company Name'
  }
]

export default columns
