// @flow
import { generateModule } from 'context/base/withPagination'
import type { TradeHistoryListState } from './types'

const { Provider, useState, useDispatch, statusList } = generateModule<TradeHistoryListState>(
  'tradesHistoryList'
)

export default {
  TradeHistoryListProvider: Provider,
  TradeHistoryListState: useState,
  useTradeHistoryListDispatch: useDispatch,
  TRADE_HISTORY_LIST_STATUS: statusList
}
