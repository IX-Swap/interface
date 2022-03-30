import { TableColumn } from 'types/util'
import { ThirdTableItem } from 'ui/UIKit/TablesKit/ThirdTable/ThirdTable'
import { RenderBolderText, renderStatus } from 'ui/UIKit/TablesKit/utils/utils'

export const columns: Array<TableColumn<ThirdTableItem>> = [
  {
    key: 'currency',
    label: '',
    render: RenderBolderText
  },
  {
    label: 'Bank Name',
    key: 'bankName',
    render: RenderBolderText
  },
  {
    label: 'Account Number',
    key: 'accountNumber'
  },
  {
    label: 'SwiftCode',
    key: 'swiftCode'
  },
  {
    label: 'Status',
    key: 'status',
    headAlign: 'right',
    align: 'right',
    render: renderStatus
  }
]
