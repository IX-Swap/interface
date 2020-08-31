//

export default function generateReducers (
  actionTypes,
  statusTypes,
  additionalReducer
) {
  const reducer = (state, load) => {
    const { type, payload } = load
    const items = (payload && payload.items) || state.items

    switch (type) {
      case actionTypes.GET_REQUEST:
        return {
          ...state,
          status: statusTypes.GETTING,
          error: '',
          statusCode: null
        }
      case actionTypes.GET_SUCCESS:
        return {
          ...state,
          status: statusTypes.IDLE,
          error: null,
          items: payload.items,
          total: payload.total,
          statusCode: payload.statusCode
        }
      case actionTypes.GET_FAILURE:
        return {
          ...state,
          status: statusTypes.IDLE,
          error: payload.message,
          statusCode: payload.statusCode,
          items
        }
      case actionTypes.PAGE_CHANGE:
        return {
          ...state,
          status: statusTypes.INIT,
          page: payload.page || 0
        }
      case actionTypes.ROWS_PER_PAGE_CHANGE:
        return {
          ...state,
          limit: payload.rows
        }
      case actionTypes.CLEAR_DATA:
        return {
          ...state,
          limit: 5,
          items: [],
          error: '',
          errorCode: undefined,
          statusCode: undefined
        }
      case actionTypes.CLEAR_API:
        return {
          ...state,
          error: '',
          errorCode: undefined,
          statusCode: undefined
        }
      default:
        if (additionalReducer) {
          return additionalReducer(statusTypes, state, load)
        }

        throw new Error(`Unhandled action type: ${type}`)
    }
  }

  return reducer
}
