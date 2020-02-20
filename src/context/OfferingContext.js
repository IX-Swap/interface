import React from 'react'

var PrimaryOfferingStateContext = React.createContext()
var PrimaryOfferingDispatchContext = React.createContext()

function getPrimaryOfferingsReducer (state, action) {
  switch (action.type) {
    case 'GET_PRIMARY_OFFERINGS':
      return { 
        ...state,
        fetching: true,
        error: null }
    case 'GET_PRIMARY_OFFERINGS_SUCCESS':
      return { 
        ...state,
        fetching: false,
        error: null,
        primaryOfferings: action.primaryOfferings }
    case 'GET_PRIMARY_OFFERINGS_FAILED': {
      return {
        ...state,
        fetching: false,
        primaryOfferings: [],
        error: action.error }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function PrimaryOfferingsProvider ({ children }) {
  var [state, dispatch] = React.useReducer(getPrimaryOfferingsReducer, {
    primaryOfferings: []
  })

  return (
    <PrimaryOfferingStateContext.Provider value={state}>
      <PrimaryOfferingDispatchContext.Provider value={dispatch}>
        {children}
      </PrimaryOfferingDispatchContext.Provider>
    </PrimaryOfferingStateContext.Provider>
  )
}

function useUserState () {
  var context = React.useContext(UserStateContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }
  return context
}

function useUserDispatch () {
  var context = React.useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut }

// ###########################################################

function loginUser (dispatch, login, password, history, setIsLoading, setError) {
  setError(false)
  setIsLoading(true)

  if (!!login && !!password) {
    setTimeout(() => {
      localStorage.setItem('id_token', '1')
      dispatch({ type: 'LOGIN_SUCCESS' })
      setError(null)
      setIsLoading(false)

      history.push('/app/dashboard')
    }, 2000)
  } else {
    dispatch({ type: 'LOGIN_FAILURE' })
    setError(true)
    setIsLoading(false)
  }
}

function signOut (dispatch, history) {
  localStorage.removeItem('id_token')
  dispatch({ type: 'SIGN_OUT_SUCCESS' })
  history.push('/login')
}
