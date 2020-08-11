//
import { isEmpty } from 'lodash'

export const identityReducer = (state, { type, payload }) => {
  switch (type) {
    case actions.GET_IDENTITY_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        error: { ...state.error, get: null }
      }

    case actions.GET_IDENTITY_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        identity: payload.identity,
        corporate: payload.corporate,
        dataroom: !isEmpty(payload.identity) ? payload.identity?.documents : [],
        corporateDataroom: !isEmpty(payload.corporate)
          ? payload.corporate?.documents
          : [],
        shouldCreateNew: payload.shouldCreateNew,
        editMode: payload.editMode
      }

    case actions.GET_IDENTITY_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, get: payload }
      }

    case actions.CREATE_IDENTITY_REQUEST:
      return {
        ...state,
        status: STATUS.SAVING,
        error: { ...state.error, save: null }
      }

    case actions.CREATE_IDENTITY_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        identity: payload.identity,
        corporate: payload.corporate,
        editMode: false
      }

    case actions.CREATE_IDENTITY_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, save: payload }
      }

    case actions.SAVE_FILE_REQUEST:
      return {
        ...state,
        status: STATUS.SAVING,
        error: { ...state.error, save: null }
      }

    case actions.SAVE_FILE_SUCCESS:
      if (payload.type === 'Identity/Individual') {
        return {
          ...state,
          status: STATUS.IDLE,
          dataroom: [...state.dataroom, payload.data]
        }
      }

      return {
        ...state,
        status: STATUS.IDLE,
        corporateDataroom: [...state.corporateDataroom, payload.data]
      }

    case actions.SAVE_FILE_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, save: payload }
      }

    case actions.DOWNLOAD_FILE_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        error: { ...state.error, get: null }
      }

    case actions.DOWNLOAD_FILE_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, get: null }
      }

    case actions.DOWNLOAD_FILE_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, get: payload.message }
      }

    case actions.DELETE_FILE_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        error: { ...state.error, get: null }
      }

    case actions.DELETE_FILE_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const individualDataroom = state.dataroom.filter(
        datum => datum._id !== payload._id
      )
      // eslint-disable-next-line no-case-declarations
      const corporateDataroom = state.corporateDataroom.filter(
        datum => datum._id !== payload._id
      )

      return {
        ...state,
        status: STATUS.IDLE,
        dataroom: [...individualDataroom],
        corporateDataroom: [...corporateDataroom],
        error: { ...state.error, get: null }
      }

    case actions.DELETE_FILE_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, get: payload.message }
      }

    case actions.TOGGLE_EDIT_MODE: {
      return {
        ...state,
        editMode: payload || !state.editMode
      }
    }

    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}
