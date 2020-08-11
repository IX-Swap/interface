//
import actionGenerator from 'context/base/withPagination/actions'
import localStore from 'services/storageHelper'

const { getter: getOrdersList, ...pageMethods } = actionGenerator(
  'ordersList',
  `/exchange/orders/list/${localStore.getUserId()}`,
  {}
)
export default {
  getOrdersList,
  ...pageMethods
}
