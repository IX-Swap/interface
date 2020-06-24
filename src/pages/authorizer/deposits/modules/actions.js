// @flow
import actionGenerator from 'context/base/withPagination/actions'
import { putRequest } from 'services/httpRequests'
import type { Deposit } from './types'

const { getter: getDeposits, ...pageMethods } = actionGenerator(
  'authorizerDepositsList',
  '/accounts/cash/deposits',
  {}
)

const toggleDepositStatus = async (deposit: Deposit, newStatus: string) => {
  const action = newStatus.toLowerCase().includes('approve')
    ? 'approve'
    : 'reject'
  const url = `/accounts/cash/deposits/${deposit._id}/${action}`
  const response = await putRequest(url)

  return response.status === 200
}

export default {
  toggleDepositStatus,
  getDeposits,
  ...pageMethods
}
