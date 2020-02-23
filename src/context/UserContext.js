import React from 'react'
import logger from 'use-reducer-logger'

const UserStateContext = React.createContext()
const UserDispatchContext = React.createContext()

export function userReducer (state, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, isAuthenticated: false, isLoading: true, error: null }
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true, isLoading: false, error: null }
    case 'LOGIN_FAILURE':
      return {...state, isAuthenticated: false, isLoading: false, error: action.payload }
    case 'SIGN_OUT_SUCCESS':
      return { ...state, isAuthenticated: false }
    case 'SIGNUP_REQUEST':
      return { ...state, isAuthenticated: false, isLoading: true, error: null }
    case 'SIGNUP_SUCCESS':
      return { ...state, isAuthenticated: false, isLoading: false, error: null, activeTabId: 0 }
    case 'SIGNUP_FAILURE':
      return { ...state, isAuthenticated: false, isLoading: false, error: action.payload }
    case 'SET_ACTIVE_TAB_ID': 
      return { ...state, activeTabId: action.payload , error: null }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export function UserProvider ({ children }) {
  const thisReducer = process.env.NODE_ENV === 'development' 
  ? logger(userReducer)
  : userReducer
  const [state, dispatch] = React.useReducer(thisReducer, {
    isAuthenticated: !!localStorage.getItem('id_token'),
    isLoading: false,
    activeTabId: 0,
    error: ''
  })

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export function useUserState () {
  const context = React.useContext(UserStateContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }
  return context
}

export function useUserDispatch () {
  const context = React.useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider')
  }
  return context
}

// ###########################################################

export async function loginUser (dispatch, username, password) {
  dispatch({ type: 'LOGIN_REQUEST' })

  try {
    const result = await fetch('http://localhost:3456/identity/auth/login',
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({ username, password })
      })
    
    const response = await result.json()

    if (result.status === 200) {
      const token = response.data.accessToken
      localStorage.setItem('id_token', token)
      dispatch({ type: 'LOGIN_SUCCESS', payload: token })
    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: response.message })
    }
  } catch(err) {
    dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed.'})
  }
}

export async function signupUser (dispatch, name, email, password) {
  dispatch({ type: 'SIGNUP_REQUEST'})
  try {
    const result = await fetch('http://localhost:3456/identity/auth/sign-up',
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({ name, email, password })
      })
    
    const response = await result.json()

    if (result.status === 200) {
      dispatch({ type: 'SIGNUP_SUCCESS' })
    } else {
      dispatch({ type: 'SIGNUP_FAILURE', payload: response.message })
    }
  } catch(err) {
    dispatch({ type: 'SIGNUP_FAILURE', payload: 'Signup failed.'})
  }
}

export function setActiveTabId (dispatch, activeTabId) {
  dispatch({ type: 'SET_ACTIVE_TAB_ID', payload: activeTabId })
}

export function signOut (dispatch, history) {
  localStorage.removeItem('id_token')
  dispatch({ type: 'SIGN_OUT_SUCCESS' })
  history.push('/login')
}
