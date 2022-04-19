import { TableColumn } from 'types/util'
import {
  RenderBolderText,
  renderSGDPrice
} from 'ui/UIKit/TablesKit/utils/utils'
import { SecondTableItem } from 'ui/UIKit/TablesKit/SecondTable/SecondTable'

export const columns: Array<TableColumn<SecondTableItem>> = [
  {
    key: 'pair',
    label: 'Pair',
    render: RenderBolderText
  },
  {
    label: 'Symbol',
    key: 'symbol',
    render: RenderBolderText
  },
  {
    label: 'Issued By',
    key: 'issuedBy',
    render: RenderBolderText
  },
  {
    label: 'Type',
    key: 'type'
  },
  {
    label: 'Price',
    key: 'price',
    render: renderSGDPrice
  }
]
