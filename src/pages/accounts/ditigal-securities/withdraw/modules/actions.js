// @flow
import { postRequest } from 'services/httpRequests'
import actionGenerator from 'context/base/withPagination/actions'
import storage from 'services/storageHelper'

import type { TransferDetails } from '../../modules/types'

const {
  getter: getDigitalSecurityWithdrawals,
  ...pageMethods
} = actionGenerator(
  'getDigitalSecurityWithdrawalsList',
  `/accounts/security/withdrawals/list/${storage.getUserId()}`,
  {}
)

export const withdraw = async (pld: TransferDetails) => {
  const { date, ...payload } = pld
  const url = `/accounts/security/withdrawals/${storage.getUserId()}`
  const response = await postRequest(url, payload)

  return response.status === 200
}

export default {
  getDigitalSecurityWithdrawals,
  ...pageMethods,
  withdraw
}
