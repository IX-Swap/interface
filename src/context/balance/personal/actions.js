// @flow
import actionGenerator from 'context/base/withPagination/actions'
import storage from 'services/storageHelper'

const { getter: getPersonalBalanceList, ...pageMethods } = actionGenerator(
  'personalBalanceList',
  `/accounts/balance/${storage.getUserId()}`,
  {}
)

export default {
  getPersonalBalanceList,
  ...pageMethods
}
