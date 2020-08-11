//

export const twoFactorReducer = (state, { type, payload }) => {
  switch (type) {
    case actions.SETUP_2FA_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        error: null
      }

    case actions.SETUP_2FA_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        data: payload
      }

    case actions.SETUP_2FA_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: payload
      }

    case actions.CONFIRM_2FA_REQUEST:
      return {
        ...state,
        status: STATUS.SAVING,
        error: null
      }

    case actions.CONFIRM_2FA_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        confirmed: true
      }

    case actions.CONFIRM_2FA_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: payload
      }

    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}
