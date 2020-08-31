//
import { postRequest } from 'v1/services/httpRequests'
import localStore from 'v1/services/storageHelper'

export const setupTwoFactor = async dispatch => {
  dispatch({ type: actions.SETUP_2FA_REQUEST })

  try {
    const url = `/auth/2fa/setup/${localStore.getUserId()}`
    const result = await postRequest(url)
    const response = await result.json()

    if (result.status !== 200) {
      dispatch({ type: actions.SETUP_2FA_FAILURE, payload: response.message })
    } else {
      dispatch({ type: actions.SETUP_2FA_SUCCESS, payload: response.data })
    }
  } catch (err) {
    const errMsg =
      err.message || err.toString() || 'Setup Google Authenticator failed.'
    dispatch({ type: actions.SETUP_2FA_FAILURE, payload: errMsg })
  }
}

export const confirmTwoFactor = async (dispatch, otp) => {
  dispatch({ type: actions.CONFIRM_2FA_REQUEST })

  try {
    const url = `/auth/2fa/setup/${localStore.getUserId()}/confirm/${otp}`
    const result = await postRequest(url)
    const response = await result.json()

    if (result.status !== 200) {
      dispatch({
        type: actions.CONFIRM_2FA_FAILURE,
        payload: response.message
      })
    } else {
      dispatch({
        type: actions.CONFIRM_2FA_SUCCESS
      })
    }
  } catch (err) {
    const errMsg =
      err.message || err.toString() || 'Setup Google Authenticator failed.'
    dispatch({ type: actions.CONFIRM_2FA_FAILURE, payload: errMsg })
  }
}
