//

export const issuanceReducer = (state, { type, payload }) => {
  switch (type) {
    case actions.SET_SELECTED_DSO:
      return {
        ...state,
        dso: payload
      }

    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}
