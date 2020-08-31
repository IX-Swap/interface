//
import actionGenerator from 'v1/context/base/withPagination/actions'
import storage from 'v1/services/storageHelper'

const { getter: getPersonalBalanceList, ...pageMethods } = actionGenerator(
  'personalBalanceList',
  `/accounts/balance/${storage.getUserId()}`,
  {}
)

export default {
  getPersonalBalanceList,
  ...pageMethods
}
