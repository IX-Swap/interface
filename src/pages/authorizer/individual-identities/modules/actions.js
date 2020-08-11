//
import actionGenerator from 'context/base/withPagination/actions'

import { putRequest } from 'services/httpRequests'

const { getter: getIdentities, ...pageMethods } = actionGenerator(
  'authorizerIdentityList',
  '/identity/individuals/list',
  {}
)

const toggleIdentityStatus = async (identity, newStatus) => {
  const action = newStatus.toLowerCase().includes('approve')
    ? 'approve'
    : 'reject'
  const url = `/identity/individuals/${identity.user._id}/${action}`
  const response = await putRequest(url)

  return response.status === 200
}

export default {
  toggleIdentityStatus,
  getIdentities,
  ...pageMethods
}
