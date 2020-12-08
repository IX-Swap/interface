import React, {
  createContext,
  PropsWithChildren,
  Reducer,
  useContext,
  useReducer
} from 'react'

interface AppState {
  pageTitle?: string
  isNavDrawerOpened: boolean
}

type AppActionTypes =
  | {
      type: 'setPageTitle'
      payload: AppState['pageTitle']
    }
  | {
      type: 'setNavDrawerOpened'
      payload: AppState['isNavDrawerOpened']
    }

const AppStateContext = createContext<AppState | null>(null)

interface AppActions {
  setPageTitle: (title: AppState['pageTitle']) => void
  setNavDrawerOpened: (status: boolean) => void
}

const AppActionsContext = createContext<AppActions | null>(null)

const initialAppState = { pageTitle: undefined, isNavDrawerOpened: false }

const appReducer = (state: AppState, action: AppActionTypes) => {
  switch (action.type) {
    case 'setPageTitle':
      return {
        ...state,
        pageTitle: action.payload
      }

    case 'setNavDrawerOpened':
      return {
        ...state,
        isNavDrawerOpened: action.payload
      }

    default:
      throw new Error('Unsupported action')
  }
}

export const AppStateProvider = (props: PropsWithChildren<any>) => {
  const [state, dispatch] = useReducer<Reducer<AppState, AppActionTypes>>(
    appReducer,
    initialAppState
  )
  const appActions = {
    setPageTitle: (title: AppState['pageTitle']) =>
      dispatch({ type: 'setPageTitle', payload: title }),
    setNavDrawerOpened: (opened: boolean) =>
      dispatch({ type: 'setNavDrawerOpened', payload: opened })
  }

  return (
    <AppStateContext.Provider value={state}>
      <AppActionsContext.Provider value={appActions}>
        {props.children}
      </AppActionsContext.Provider>
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  const state = useContext(AppStateContext)

  if (state === undefined || state === null) {
    throw new Error('useAppState must be used inside of AppStateProvider')
  }

  return state
}

export const useAppActions = () => {
  const actions = useContext(AppActionsContext)

  if (actions === undefined || actions === null) {
    throw new Error('useAppActions must be used inside of AppActionsrovider')
  }

  return actions
}
