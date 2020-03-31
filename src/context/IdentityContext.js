import React, { useMemo } from 'react'
import logger from 'use-reducer-logger'
import { getRequest, putRequest, postRequest } from './httpRequests'
import { compareAsc } from 'date-fns'

// constants
const StateContext = React.createContext()
const DispatchContext = React.createContext()

const actions = {
  GET_IDENTITY_REQUEST: 'GET_IDENTITY_REQUEST',
  GET_IDENTITY_SUCCESS: 'GET_IDENTITY_SUCCESS',
  GET_IDENTITY_FAILURE: 'GET_IDENTITY_FAILURE',
  SAVE_IDENTITY_REQUEST: 'SAVE_IDENTITY_REQUEST',
  SAVE_IDENTITY_SUCCESS: 'SAVE_IDENTITY_SUCCESS',
  SAVE_IDENTITY_FAILURE: 'SAVE_IDENTITY_FAILURE',
  SAVE_FILE_REQUEST: 'SAVE_FILE_REQUEST',
  SAVE_FILE_SUCCESS: 'SAVE_FILE_SUCCESS',
  SAVE_FILE_FAILURE: 'SAVE_FILE_FAILURE',
  DOWNLOAD_FILE_REQUEST: 'DOWNLOAD_FILE_REQUEST',
  DOWNLOAD_FILE_SUCCESS: 'DOWNLOAD_FILE_SUCCESS',
  DOWNLOAD_FILE_FAILURE: 'DOWNLOAD_FILE_FAILURE'
}

export const IDENTITY_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING'
}

const STATUS = IDENTITY_STATUS

const initialState = {
  identity: {},
  status: STATUS.INIT,
  shouldCreateNew: false,
  error: {
    save: null,
    get: null
  }
}

// reducer
export function identityReducer (state, { type, payload }) {
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
        shouldCreateNew: payload.shouldCreateNew
      }
    case actions.GET_IDENTITY_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, get: payload }
      }

    case actions.SAVE_IDENTITY_REQUEST:
      return {
        ...state,
        status: STATUS.SAVING,
        error: { ...state.error, save: null }
      }
    case actions.SAVE_IDENTITY_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        identity: payload,
        shouldCreateNew: false
      }
    case actions.SAVE_IDENTITY_FAILURE:
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
      return { ...state, status: STATUS.IDLE }
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

    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

// context and hooks
export function IdentityProvider ({ children }) {
  const thisReducer = useMemo(
    () =>
      process.env.NODE_ENV === 'development'
        ? logger(identityReducer)
        : identityReducer,
    []
  )

  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export function useIdentityState () {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error('useIdentityState must be used within a IdentityProvider')
  }
  return context
}

export function useIdentityDispatch () {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error(
      'useIdentityDispatch must be used within a IdentityProvider'
    )
  }
  return context
}

// actions
export async function getIdentity (dispatch) {
  dispatch({ type: actions.GET_IDENTITY_REQUEST })

  try {
    const individualUri = '/identity/profile/individual'

    const result = await getRequest(individualUri)
    const response = await result.json()

    if (result.status === 200) {
      dispatch({
        type: actions.GET_IDENTITY_SUCCESS,
        payload: {
          identity: response.data,
          shouldCreateNew: response.message === 'shouldCreateNew' ? true : false
        }
      })
    } else {
      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Loading profile failed.'
    dispatch({ type: actions.GET_IDENTITY_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}

export async function saveIdentity (dispatch, identity, shouldCreateNew) {
  dispatch({ type: actions.SAVE_IDENTITY_REQUEST })

  try {
    let { id, type, ...filteredId } = identity || {}
    type = type || 'individual'
    const postUri = `/identity/profile/${type}/`
    const putUri = `/identity/profile/${type}/${id}`

    const result = shouldCreateNew
      ? await postRequest(postUri, filteredId)
      : await putRequest(putUri, filteredId)

    const response = await result.json()
    if (result.status === 200) {
      const payload = response.data || {}
      dispatch({ type: actions.SAVE_IDENTITY_SUCCESS, payload })
    } else {
      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Saving profile failed.'
    dispatch({ type: actions.SAVE_IDENTITY_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}

export async function saveFinancials (dispatch, identity) {
  dispatch({ type: actions.SAVE_IDENTITY_REQUEST })

  try {
    const uri = '/identity/profile/individual/financials'
    const result = await putRequest(uri, identity)
    const response = await result.json()
    if (result.status === 200) {
      const payload = response.data || {}
      dispatch({ type: actions.SAVE_IDENTITY_SUCCESS, payload })
    } else {
      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Saving profile failed.'
    dispatch({ type: actions.SAVE_IDENTITY_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}

export async function saveFile (dispatch, payload) {
  /**
   * saveFile requires the following params in payload
   * @param String title
   * @param String type
   * @param String file
   * @param Enum type individual | corporate
   * @param String id individal document id or corporate document id
   */

  const { title, file, type, id } = payload
  dispatch({ type: actions.SAVE_FILE_REQUEST })

  try {
    const formData = new FormData()

    formData.append('title', title)
    formData.append('document', file)
    formData.append('type', type)

    const uri = '/dataroom'
    const result = await postRequest(uri, formData)

    const response = await result.json()
    if (result.status === 200) {
      const data = response.data[0]
      const payload = {
        ...data,
        fileName: data.fileName || data.originalFileName
      }

      // as the API implements a two step process to upload
      // a file, we have to also associate the file with
      // the individual or corporate

      dispatch({ type: actions.SAVE_FILE_SUCCESS, payload })

      await saveIdentity(dispatch, { type, id, documents: [data._id] }, false)
    } else {
      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Upload failed.'
    dispatch({ type: actions.SAVE_FILE_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}

export const downloadFile = async (dispatch, documentId) => {
  try {
    dispatch({ type: actions.DOWNLOAD_FILE_REQUEST })
    const uri = `/dataroom/raw/${documentId}`
    const result = await getRequest(uri)

    if (result.status === 200) {
      result.blob().then(blob => {
        let url = window.URL.createObjectURL(blob)
        window.open(url)
        dispatch({ type: actions.DOWNLOAD_FILE_SUCCESS })
      })
    } else {
      dispatch({ type: actions.DOWNLOAD_FILE_FAILURE })
    }
  } catch (err) {
    console.log(err)
  }
}

// selectors
export const selectFile = (state, title) =>
  state.identity.documents
    ?.filter?.(f => f.title === title)
    .reduce((lastFile, currFile) => {
      if (!lastFile) return currFile
      const lastDate = new Date(lastFile.createdAt)
      const currDate = new Date(currFile.createdAt)
      const isLastFileOutdated = compareAsc(currDate, lastDate) === 1
      return isLastFileOutdated ? currFile : lastFile
    }, null)
