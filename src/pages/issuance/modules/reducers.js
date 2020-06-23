// @flow
import { actions } from './types'
import type { IssuanceState } from './types'

export const issuanceReducer = (
  state: IssuanceState,
  { type, payload }: { type: string, payload: any }
) => {
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
