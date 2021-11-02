import { TableColumn } from 'types/util'
import { MetaDataField } from 'types/blockchain'

export const columns: Array<TableColumn<MetaDataField>> = [
  {
    key: 'data-field',
    render: (_, item) => item?.[0],
    label: 'Smart Contract Data Field'
  },
  {
    key: 'data-type',
    render: (_, item) => item?.[1],
    label: 'Data Type'
  },
  {
    key: 'source',
    render: (_, item) => item?.[2],
    label: 'Source: Data Collection -> Data Documents'
  }
]
