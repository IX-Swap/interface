//
import { postRequest, getRequest } from 'services/httpRequests'
import localStore from 'services/storageHelper'

export const setSelectedDso = (dispatch, dso) => {
  dispatch({ type: actions.SET_SELECTED_DSO, payload: dso })
}

export const setSelectedCommitment = (dispatch, commitment) => {
  dispatch({ type: actions.SET_SELECTED_COMMITMENT, payload: commitment })
}

export const toggleEditMode = (dispatch, value) => {
  dispatch({ type: actions.TOGGLE_EDIT_MODE, payload: value })
}

// not using PasswordReset
export const fetchAccountBalanceByAsset = async (asset) => {
  const userId = localStore.getUserId()
  const url = `/accounts/balance/${userId}/${asset}`

  const response = await postRequest(url, { skip: 0, limit: 50 })
  const result = await response.json()

  if (response.status === 200) {
    return result.data[0].documents[0]
  }

  throw new Error(result.message)
}

// not using PasswordReset
export const addCommitment = async ({
  dso,
  signedSubscriptionDocument,
  currency,
  walletAddress,
  numberOfUnits,
  otp
}) => {
  const userId = localStore.getUserId()
  const url = `/issuance/commitments/${userId}`

  const response = await postRequest(url, {
    dso,
    signedSubscriptionDocument,
    currency,
    walletAddress,
    numberOfUnits,
    otp
  })
  const result = await response.json()

  if (response.status === 200) {
    return result.data
  }

  throw new Error(result.message)
}

export async function uploadFile (payload) {
  /**
   * saveFile requires the following params in payload
   * @param String title
   * @param String type
   * @param String file
   * @param Enum type Identity/Individual | Identity/Corporate
   * @param String id individal document id or corporate document id
   */

  const { title, file, type } = payload

  try {
    const formData = new FormData()

    formData.append('title', title)
    formData.append('documents', file)
    formData.append('type', type)

    const uri = '/dataroom'
    const result = await postRequest(uri, formData)

    const response = await result.json()
    if (result.status === 200) {
      const data = response.data[0]

      return data
    }

    throw new Error(response.message)
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Upload failed.'
    throw new Error(errMsg)
  }
}

export const downloadFile = async (dsoId) => {
  try {
    const uri = `/issuance/dso/dataroom/subscription/raw/${dsoId}`
    const result = await getRequest(uri)

    if (result.status === 200) {
      result.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob)
        window.open(url)
      })
    } else {
      throw new Error('Download failed')
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Download failed.'
    throw new Error(errMsg)
  }
}
