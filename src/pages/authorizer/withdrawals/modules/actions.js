//
import actionGenerator from 'context/base/withPagination/actions'
import { putRequest } from 'services/httpRequests'

const { getter: getWithdraws, ...pageMethods } = actionGenerator(
  'authorizerWithdrawsList',
  '/accounts/cash/withdrawals',
  {}
)

const toggleWithdrawStatus = async (withdraw, newStatus) => {
  const action = newStatus.toLowerCase().includes('approve')
    ? 'approve'
    : 'reject'
  const url = `/accounts/cash/withdrawals/${withdraw._id}/${action}`
  const response = await putRequest(url)

  return response.status === 200
}

export default {
  toggleWithdrawStatus,
  getWithdraws,
  ...pageMethods
}
