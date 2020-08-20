import { TableColumn } from 'v2/types/util'
import { Listing } from 'v2/types/listing'

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
