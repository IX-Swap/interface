import {
  renderBalance,
  renderUSDPrice,
  renderCurrencyLabel
} from 'ui/UIKit/TablesKit/utils/utils'
import { TableColumn } from 'types/util'
import { FirstTableItem } from 'ui/UIKit/TablesKit/FirstTable/FirstTable'

export const columns: Array<TableColumn<FirstTableItem>> = [
  {
    key: 'currency',
    label: '',
    render: renderCurrencyLabel
  },
  {
    label: 'Balance',
    key: 'balance',
    render: renderBalance
  },
  {
    label: 'USD Value',
    key: 'usdValue',
    render: renderUSDPrice
  },
  {
    label: 'AvailableBalance',
    key: 'availableBalance',
    render: renderUSDPrice
  }
]
