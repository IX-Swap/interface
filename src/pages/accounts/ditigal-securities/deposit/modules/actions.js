// @flow
import actionGenerator from 'context/base/withPagination/actions'
import storage from 'services/storageHelper'

const { getter: getDigitalSecurityDeposits, ...pageMethods } = actionGenerator(
  'getDigitalSecurityDepositsList',
  `/accounts/security/deposits/list/${storage.getUserId()}`,
  {}
)

export default {
  getDigitalSecurityDeposits,
  ...pageMethods
}
