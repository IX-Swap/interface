//

export default function addBankReducer (statusTypes, state, action) {
  switch (action.type) {
    case userAddBankActions.USER_ADD_BANK_REQUEST:
      return {
        ...state,
        status: bankSaveStatus.BANK_SAVING,
        statusCode: undefined,
        error: ''
      }
    case userAddBankActions.USER_ADD_BANK_SUCCESS:
      return {
        ...state,
        status: statusTypes.IDLE,
        statusCode: 200,
        error: ''
      }
    case userAddBankActions.USER_ADD_BANK_FAILURE:
      return {
        ...state,
        status: statusTypes.IDLE,
        error: action.payload.message,
        statusCode: action.payload.statusCode
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
