//
import actionGenerator from 'v1/context/base/withPagination/actions'
import localStore from 'v1/services/storageHelper'

const { getter: getOrdersList, ...pageMethods } = actionGenerator(
  'ordersList',
  `/exchange/orders/list/${localStore.getUserId()}`,
  {}
)
export default {
  getOrdersList,
  ...pageMethods
}
