//
import actionGenerator from 'v1/context/base/withPagination/actions'
import localStore from 'v1/services/storageHelper'

const { getter: getTradeHistory, ...pageMethods } = actionGenerator(
  'tradesHistoryList',
  `/exchange/trades/list/${localStore.getUserId()}`,
  {}
)
export default {
  getTradeHistory,
  ...pageMethods
}
