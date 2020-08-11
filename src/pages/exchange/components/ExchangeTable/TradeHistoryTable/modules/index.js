//
import { generateModule } from 'context/base/withPagination'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'tradesHistoryList'
)

export default {
  TradeHistoryListProvider: Provider,
  TradeHistoryListState: useState,
  useTradeHistoryListDispatch: useDispatch,
  TRADE_HISTORY_LIST_STATUS: statusList
}
