//
import actionGenerator from 'context/base/withPagination/actions'

import { snackbarService } from 'uno-material-ui'
import { putRequest, getRequest } from 'services/httpRequests'

const { getter: getCommitments, ...pageMethods } = actionGenerator(
  'authorizerCommitmentList',
  '/issuance/commitments/list',
  {}
)

export const toggleCommitmentStatus = async (commitment, newStatus) => {
  const action = newStatus.toLowerCase().includes('approve')
    ? 'approve'
    : 'reject'
  const url = `/issuance/commitments/${commitment._id}/${action}`
  const response = await putRequest(url)

  return response.status === 200
}

export const downloadFile = async documentId => {
  try {
    const uri = `/issuance/dso/dataroom/subscription/raw/${documentId}`
    const result = await getRequest(uri)

    if (result.status === 200) {
      result.blob().then(blob => {
        const url = window.URL.createObjectURL(blob)
        window.open(url)
      })
      return
    }

    snackbarService.showSnackbar('Download failed', 'error')
  } catch (err) {
    snackbarService.showSnackbar('Download failed', 'error')
  }
}

export const uploadSigned = async (commitmentId, documentId) => {
  let response
  const payload = {
    countersignedSubscriptionDocument: documentId
  }

  try {
    const uri = `/issuance/commitment/dataroom/subscription/counter-signed/${commitmentId}`
    const result = await putRequest(uri, payload)
    response = await result.json()

    if (result.status === 200) {
      return true
    }

    snackbarService.showSnackbar(
      (response && response.message) ||
        'Failed to update countersigned document',
      'error'
    )
  } catch (err) {
    snackbarService.showSnackbar(
      (response && response.message) ||
        'Failed to update countersigned document',
      'error'
    )
  }
}

export default {
  uploadSigned,
  toggleCommitmentStatus,
  getCommitments,
  ...pageMethods
}
